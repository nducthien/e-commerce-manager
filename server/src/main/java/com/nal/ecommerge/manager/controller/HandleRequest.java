package com.nal.ecommerge.manager.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class HandleRequest {
    @RequestMapping("/{path:[^\\.]+}/**")
    public String forward() {
        return "forward:/index.html";
    }
}