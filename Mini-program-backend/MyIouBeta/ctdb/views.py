import json
import os
import requests
import cv2
from django.core.paginator import Paginator, EmptyPage
from django.http import HttpResponse, JsonResponse
# Create your views here.

from ctdb.models import Ioure,Student

#求图片hash（自己的算法）：
def get_hash(imgpath):
    txt = ''
    img = cv2.imread(imgpath)
    img = img[180:500, 15:335]  # 分割为320*320的密集区域
    img = cv2.resize(img, (64,64), interpolation=cv2.INTER_CUBIC)  # 然后进行降维
    imgsize = img.shape
    #print(imgsize)
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



#上传||同时需要上链！
def upload_view(request):
    if request.method == 'GET':
        return HttpResponse('error')
    elif request.method == 'POST':
        brrowimg = request.FILES['brrowimg']
        stuid1 = request.POST.get('stuid1')
        stuid2 = request.POST.get('stuid2')
        name1 = request.POST.get('name1')
        name2 = request.POST.get('name2')
        phonenum1 = request.POST.get('phonenum1')
        phonenum2 = request.POST.get('phonenum2')
        moneynum = request.POST.get('moneynum')
        brrowbackdate = request.POST.get('brrowbackdate')

        stu1 = Student.objects.filter(stuid = stuid1).first()
        stu2 = Student.objects.filter(stuid = stuid2).first()
        #仅能更新联系方式,可有可无，懒得做手机号验证码了
        if stu1.phonenum != phonenum1:
            stu1.phonenum = phonenum1
            stu1.save()
        if stu2.phonenum != phonenum2:
            stu2.phonenum = phonenum2
            stu2.save()

        #保存借条信息
        new_iou = Ioure(
            stuid1 = stuid1,
            stuid2 = stuid2,
            moneynum = moneynum,
            brrowimg = brrowimg,
            brrowbackdate = brrowbackdate
        )
        new_iou.save()      #此时可以获得id等内容

        # 上链尝试：
        #0、magic数字获取
        id = new_iou.id
        print(id)
        imgid = str(id) + '_' + new_iou.stuid1 + '_' + new_iou.stuid2
        #1、imghash计算（使用ahash算法）
        imgpath0 = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
        imgpath = os.path.join( imgpath0,'media')
        imgpath = os.path.join(imgpath, new_iou.brrowimg.name)
        #print(imgpath)
        imghash = get_hash(imgpath)
        #print(imghash)

        #2、imgval拼接（整个记录生成字符串）
        imgval = new_iou.stuid1+'_'+name1+'_'+new_iou.stuid2+'_'+name2+'_'+str(new_iou.moneynum)+'_'+new_iou.brrowdate.strftime("%Y-%m-%d")+'_'+new_iou.brrowbackdate
        #print(imgval)

        #尝试上链！
        url = 'http://120.25.123.46:7022/contract/kvrs/set'
        data = {"id":imgid,"imghash":imghash,"imgval":imgval}
        headers = {
            "content-type":"application/json"
        }
        response = requests.post(url=url,headers=headers,json=data)
        response = response.json()      #json解码
        if True == response['success']:
            return HttpResponse(str(id))
        else:
            return HttpResponse('block')



def view1_iou(request):
    if request.method == 'POST':
        wxid = request.POST.get('wxid')
        numpage = request.POST.get('num',1)
        student = Student.objects.filter(wxid=wxid).first()
        if student:
            ious = Ioure.objects.filter(stuid1=student.stuid)
            paginator = Paginator(ious,5)
            respmsg = []
            try:
                contexts = paginator.page(numpage)
            except EmptyPage:
                return HttpResponse('over')
            for context in contexts:
                print(context.stuid1,context.stuid2,student.name)
                studento = Student.objects.filter(stuid=context.stuid2).first()
                monnum = float(context.moneynum)
                imgpath = str(context.brrowimg)
                brrowdate = context.brrowdate.strftime("%Y-%m-%d")
                brrowbackdate = context.brrowbackdate.strftime("%Y-%m-%d")
                respmsg.append({'stuid':context.stuid2,'name':studento.name,'moneynum':monnum,'imgpath':imgpath,'brrowdate':brrowdate,'brrowbackdate':brrowbackdate,'flag':context.flag})
            respmsg_json = json.dumps(respmsg,ensure_ascii=False)
            return HttpResponse(respmsg_json)
        return HttpResponse('no')
    if request.method == 'GET':
        resp = HttpResponse()
        resp.status_code = 404
        return resp


def view2_iou(request):
    if request.method == 'POST':
        wxid = request.POST.get('wxid')
        numpage = request.POST.get('num',1)
        student = Student.objects.filter(wxid=wxid).first()
        if student:
            ious = Ioure.objects.filter(stuid2=student.stuid)   #找借出人
            paginator = Paginator(ious,5)
            respmsg = []
            try:
                contexts = paginator.page(numpage)
            except EmptyPage:
                return HttpResponse('over')
            for context in contexts:
                print(context.stuid1,context.stuid2,student.name)
                studento = Student.objects.filter(stuid=context.stuid1).first()
                monnum = float(context.moneynum)
                imgpath = str(context.brrowimg)
                brrowbackdate = context.brrowbackdate.strftime("%Y-%m-%d")
                brrowdate = context.brrowdate.strftime("%Y-%m-%d")
                respmsg.append({'stuid':context.stuid1,'name':studento.name,'moneynum':monnum,'imgpath':imgpath,'brrowdate':brrowdate,'brrowbackdate':brrowbackdate,'flag':context.flag})
            respmsg_json = json.dumps(respmsg,ensure_ascii=False)
            return HttpResponse(respmsg_json)
        return HttpResponse('no')
    if request.method == 'GET':
        resp = HttpResponse()
        resp.status_code = 404
        return resp
