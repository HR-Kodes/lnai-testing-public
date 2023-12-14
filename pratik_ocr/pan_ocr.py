import tempfile
import easyocr
from ultralytics import  YOLO
import cv2
import matplotlib.pyplot as plt
from PIL import Image 
import urllib.request,io
reader = easyocr.Reader(['en'])
data={"name":"",
      "fathers_name":"",
      "dob":"",
      "pan_numer":""}
# model = YOLO('/runs/detect/train25/weights/best.pt') 
model = YOLO('runs/detect/train21/weights/best.pt')
image_url='https://legalnitiai.s3.ap-south-1.amazonaws.com/image/WhatsApp+Image+2023-08-12+at+15.50.17.jpg'
t = model.predict(image_url, save=True, imgsz=640, conf=0.1, save_txt = True, save_conf= True,show_labels= False)
img_path = []
label_path = []
img_paths=[]
label_paths=[]
img_name = image_url.split('/')[-1]

for pred in t:
    labels = pred.names  # Assuming `names` is a list of class labels
    
    img_path = pred.save_dir + '/' + img_name
    label_path = pred.save_dir + '/labels/' + '.'.join(img_name.split('.')[:-1]) + '.txt'
    
    img_paths.append(img_path)
    label_paths.append(label_path)

path = io.BytesIO(urllib.request.urlopen(image_url).read())
bg=Image.open(path)
detect_list = []
for x in range(len(img_paths)):
    with  open(label_paths[x],'r') as file:
        label = file.readlines()
    img = Image.open(path)
    # img.show()
    height  = img.height
    width = img.width
    detect_dict = {}
    for i in label:
        value = [float(a) for a in i.split()]
        sw = int(width * float(value[1] - value[3]/2))
        ew = int(width * float(value[1] + value[3]/2))
        sh = int(height * float(value[2] - value[4]/2))
        eh = int(height * float(value[2] + value[4]/2))
        if labels[int(value[0])] not in detect_dict:
            detect_dict[labels[int(value[0])]]=[[img.crop((sw, sh, ew, eh)),value[5]]]
        else:
            detect_dict[labels[int(value[0])]].append([img.crop((sw, sh, ew, eh)),value[5]])
        # img.crop((sw, sh, ew, eh)).show()
    l = len(detect_dict)
    i = 0
    for x,j in detect_dict.items():
        plt.subplot(1,l,i+1)
        plt.imshow(j[0][0])
        plt.title(x)
        i +=1
    detect_list.append(detect_dict)
    detect_list1=[x.copy() for x in detect_list]

for f,i in enumerate(detect_list):
    for x,y in i.items():
        tl = []
        highest_confidence = 0.0
        best_result = ""
        for t in y:
            
            temp_image_path = tempfile.NamedTemporaryFile(suffix='.jpg').name
            # print(temp_image_path)
            t[0].save(temp_image_path, format='JPEG')
            # temp_image_path
            results = reader.readtext(temp_image_path)

            for detection in results:
                text = detection[1]
                confidence = t[1]  # Confidence score
                
            if confidence > highest_confidence:
                highest_confidence = confidence
                best_result = text
            tl = [best_result,confidence]
        detect_list1[f][x] = tl
print(detect_list1)
