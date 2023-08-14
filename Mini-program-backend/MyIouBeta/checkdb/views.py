import requests
from django.http import HttpResponse, JsonResponse
import hashlib
# Create your views here.
from ctdb.models import Student
#获得微信openid
def get_useinfo(request):
    if request.method == 'GET':
        code = request.GET.get("code")
        url = "https://api.weixin.qq.com/sns/jscode2session"
        url += "?appid=wx5448e4a1ca27ff99"
        url += "&secret=a6feb8194db785994f4c05bdc2a675c4";
        url += "&js_code=" + code;  # 从微信小程序传来的code
        url += "&grant_type=authorization_code";
        r = requests.get(url)
        openid = r.json().get('openid', '')
        openid_en = openid.encode('utf-8')
        h = hashlib.md5(openid_en)
        h_en = h.hexdigest()
        print(len(h_en))
        return HttpResponse(h_en)

def cxbind(request):
    if request.method == 'POST':
        wxuid = request.POST.get('wxuid')
        print('拿到了！',wxuid)
        if not wxuid:
            return HttpResponse("no")
        student =  Student.objects.filter(wxid = wxuid).first()
        print(student)
        if student :
            #需要做一个字典返回
            stuinfo = {'name':student.name,'stuid':student.stuid}
            return JsonResponse(stuinfo)
        else:
            return HttpResponse("no")
        return HttpResponse("no")

def gobind(request):
    if request.method == 'POST':
        wxuid = request.POST.get('wxuid')
        stuid = request.POST.get('stuid')
        name = request.POST.get('name')
        password = request.POST.get('password')
        student = Student.objects.filter(stuid = stuid).first()
        if student:
            if student.name == name and student.password == password:
                student.wxid = wxuid
                student.save()
                return HttpResponse('ok')
        return HttpResponse('no')

def gounbind(request):
    if request.method == 'POST':
        wxuid = request.POST.get('wxuid')
        student = Student.objects.filter(wxid = wxuid).update(wxid = None)
        return HttpResponse('ok')

def cxstudent(request):
    if request.method == 'POST':
        stuid1 = request.POST.get('stuid1')
        name1 = request.POST.get('name1')
        students1 = Student.objects.filter(stuid=stuid1)
        if students1 :
            student1 = students1.first()
        else :
            return HttpResponse('no')
        stuid2 = request.POST.get('stuid2')
        name2 = request.POST.get('name2')
        students2 = Student.objects.filter(stuid=stuid2)
        if students2:
            student2 = students2.first()
        else :
            return HttpResponse('no')
        if student1.name == name1 and student2.name == name2:
            return HttpResponse('ok')
        return HttpResponse('no')

