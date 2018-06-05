# H5视频活体检测

### 在线体验地址

- http://123.207.12.111:8013/pc pc版的

- http://123.207.12.111:8013/mobile 移动版

#### 项目介绍
H5视频活体检测

H5视频活体检测产品，是由两个接口组合而成，主要用于在H5场景下，通过用户新录制并上传一个视频，来进行活体检测的判断。相对于APP有动作校验+静默图片活体、静默图片活体这两种方式，H5视频活体方案比APP方案更加灵活，同时比单张图片活体方式更加安全。其主要功能如下所示：

- 语音校验码：为防止用户提交非当前操作的视频，在录制视频时，随机分配一个数字，用户需要读出这个数字，声音存于视频当中，并在后续识别时校验，以判断是否为此次会话。
- 视频多帧活体检测：录制并上传的视频，会在云端进行随机抽帧分析，并得出最终的活体检测分数。

#### 软件架构

使用SpringBoot 2.0.1 + thymeleaf


#### 访问地址

##访问地址：
### PC ：
http://127.0.0.1:8013/pc pc版的

### 移动
http://127.0.0.1:8013/mobile 移动版

#### 配置启动

BDFactory 中 appId，apiKey,secretKey 为自己的(建议放在config文件中，此处只做示例)

运行 com.baidu.ai.demo 中的App.java main函数

#### 项目来源

https://pan.baidu.com/s/1cOWwyBSkir6nR9v0isteUw


#### 项目截图

![pc访问截图](https://gitee.com/uploads/images/2018/0605/092836_30cbc020_131538.jpeg "1.jpg")

![视频截图](https://gitee.com/uploads/images/2018/0605/093344_54a38be3_131538.png "2.png")

![视频+验证码](https://gitee.com/uploads/images/2018/0605/093415_c0cf0dfa_131538.jpeg "3.jpg")
