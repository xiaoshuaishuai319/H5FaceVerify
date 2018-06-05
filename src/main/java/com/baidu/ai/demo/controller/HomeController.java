package com.baidu.ai.demo.controller;

import com.baidu.ai.demo.factory.BDFactory;
import com.baidu.aip.face.AipFace;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

import java.util.Base64;

/**
 * Java doc
 *
 * @author songqingyun@baidu.com on 2018/5/15.
 * @editauthor 小帅丶 2018/6/5
 */
@Controller
@RequestMapping("/")
public class HomeController {
	private AipFace client = BDFactory.getAipFace();
    @RequestMapping("/pc")
    public String pc() {
        return "pc";
    }

    @RequestMapping("/mobile")
    public String mobile() {
        return "mobile";
    }

    @RequestMapping(value = "/aidemo", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String aidemo(String apiType, String type, HttpServletRequest request) {
        // 可选：设置网络连接参数
        JSONObject rs = new JSONObject();
        rs.put("errno", 0);
        rs.put("msg", "success");
        if ("faceliveness_sessioncode".equalsIgnoreCase(type)) {
            rs.put("data", client.videoSessioncode(null));
        } else {
            String sessionId = request.getParameter("session_id");
            String base64 = request.getParameter("video_base64");

            JSONObject json = client.videoFaceliveness(sessionId, Base64.getDecoder().decode(base64), null);
            // TODO 获取到接口返回的内容可以在这儿写 其他逻辑
            rs.put("data", json);
        }
        return rs.toString();
    }
}
