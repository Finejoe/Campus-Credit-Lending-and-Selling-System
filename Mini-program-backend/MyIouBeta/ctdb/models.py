import os

from django.db import models

def iouimg_directory_path(instance, filename):
    ext = filename.split('.')
    filename = '{0}_{1}.{2}'.format(instance.stuid2,ext[0], ext[1])
    return os.path.join(instance.stuid1,filename) # 系统路径分隔符差异，增强代码重用性

# Create your models here.
class Ioure(models.Model):
    stuid1 = models.CharField("学号1",max_length=12,db_index=True)
    stuid2 = models.CharField("学号2", max_length=12,db_index=True)
    moneynum = models.DecimalField("金额",max_digits=8,decimal_places=2)
    brrowimg = models.ImageField('照片',upload_to= iouimg_directory_path,null=False)
    brrowdate = models.DateTimeField("借款时间",auto_now_add=True,auto_now=False)
    brrowbackdate = models.DateField("还款期限",auto_now_add=False,auto_now=False)
    #来个time来标记是否被外人修改，修改则数据无效
    timetemp = models.DateTimeField('修改日期',auto_now=True,auto_now_add=False)
    flag = models.BooleanField('是否存在',default=False)

class Student(models.Model):
    wxid = models.CharField("微信号",max_length=32,unique=True,null=True)
    stuid = models.CharField("学号",max_length=12,unique=True)
    password = models.CharField("密码",max_length=20,default='123456',null=False)
    name = models.CharField("姓名",max_length=11)
    phonenum = models.CharField("联系方式",max_length=11)


