import argparse
import time
import requests  # Added for sending QR data
from functools import lru_cache
import cv2
from picamera2 import MappedArray, Picamera2
from picamera2.devices.imx500 import IMX500

last_detections = []
SERVER_URL = "http://0.0.0.0:5000/qr-data"  # URL to send QR data
LABEL = "qr-code"  # Hardcoded label


class Detection:
    def __init__(self, coords, category, conf, metadata):
        """Create a Detection object, recording the bounding box, category and confidence."""
        self.category = category
        self.conf = conf
        self.box = imx500.convert_inference_coords(coords, metadata, picam2)


def parse_and_draw_detections(request):
    """Analyse the detected objects in the output tensor, draw them, and send QR data."""
    detections = parse_detections(request.get_metadata())
    draw_detections(request, detections)
    send_qr_data(detections)  # Send data to the local server


def parse_detections(metadata: dict):
    """Parse the output tensor into a number of detected objects, scaled to the ISP out."""
    global last_detections

    np_outputs = imx500.get_outputs(metadata, add_batch=True)
    if np_outputs is None:
        return last_detections

    boxes, scores, classes = np_outputs[0][0], np_outputs[2][0], np_outputs[1][0]
    last_detections = [
        Detection(box, category, score, metadata)
        for box, score, category in zip(boxes, scores, classes)
    ]
    return last_detections


def draw_detections(request, detections, stream="main"):
    """Draw the detections for this request onto the ISP output."""
    with MappedArray(request, stream) as m:
        for detection in detections:
            x, y, w, h = detection.box
            label = f"{LABEL} ({detection.conf:.2f})"  # Use hardcoded "qr-code"
            cv2.putText(
                m.array,
                label,
                (x + 5, y + 15),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 0, 255),
                1,
            )
            cv2.rectangle(m.array, (x, y), (x + w, y + h), (0, 0, 255, 0))


def send_qr_data(detections):
    """Send detected QR code data to the local server."""
    for detection in detections:
        data = {"qr_data": f"QR Code Detected - Confidence: {detection.conf}"}
        try:
            response = requests.post(SERVER_URL, json=data, timeout=2)
            if response.status_code == 200:
                print("[✅] QR data sent successfully:", response.json())
            else:
                print(f"[❌] Failed to send QR data. Status Code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"[⚠️] Error sending QR data: {e}")


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=str, required=True, help="Path of the model")
    return parser.parse_args()


if __name__ == "__main__":
    args = get_args()

    # Initialize IMX500 model
    imx500 = IMX500(args.model)
    picam2 = Picamera2()

    imx500.show_network_fw_progress_bar()
    config = picam2.create_preview_configuration(buffer_count=28)
    picam2.start(config, show_preview=True)
    picam2.pre_callback = parse_and_draw_detections

    while True:
        time.sleep(0.5)
