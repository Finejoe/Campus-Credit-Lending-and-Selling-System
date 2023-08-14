import base64

import cv2
import os,json
import numpy as np
def get_hash(imgpath):
    txt = ''
    img = cv2.imread(imgpath)
    img = img[180:500, 15:335]  # 分割为320*320的密集区域
    img = cv2.resize(img, (64,64), interpolation=cv2.INTER_CUBIC)  # 然后进行降维
    imgsize = img.shape
    print(imgsize)
    #gray = int(0.2126 * r + 0.7152 * g + 0.0722 * b)
    for i in range(imgsize[0]):
        for j in range(imgsize[1]):
            gray = int(0.2*img[i][j][0]+0.7*img[i][j][1]+0.1*img[i][j][2])
            if gray < 254:              #白色背景直接取消统计
                gray = (gray%127)         #固定到可见区域32-126
                if gray < 33:
                    gray += 33
                txt += chr(gray)
    #print(txt)
    return txt


#np.set_printoptions(threshold=np.inf)
imgpath = 'C:\\Users\\zhans\\Desktop\\MyIouBeta\\media\\101\\102_9XYLQv0saqjH951efcfb27d9ae9dbdc3077b31f9ea5d.png'
txt = ''
txt =  get_hash(imgpath)
print(txt)
print(len(txt))