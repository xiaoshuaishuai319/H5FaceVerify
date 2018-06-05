package com.baidu.ai.demo.factory;

import com.baidu.aip.face.AipFace;
/**
 * 单例工厂类
 * @author 小帅丶
 */
public class BDFactory {
	private static AipFace aipFace;
	 /**
     * 百度云 应用管理相关配置， 建议放在配置文件中
     */
    private static String appId = ""; // https://cloud.baidu.com 应用管理获取 AppID
    private static String apiKey = "";// https://cloud.baidu.com 应用管理获取 API Key
    private static String secretKey = ""; // https://cloud.baidu.com 应用管理获取 Secret Key
    /**
     * 单例加载 
     * @return AipFace
     */
	public static AipFace getAipFace(){
		if(aipFace==null){
			synchronized (AipFace.class) {
				if(aipFace==null){
					aipFace = new AipFace(appId,apiKey,secretKey);
				}
			}
		}
		return aipFace;
	}

}
