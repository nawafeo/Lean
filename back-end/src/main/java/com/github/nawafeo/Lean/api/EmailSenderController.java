package com.github.nawafeo.Lean.api;

import com.github.nawafeo.Lean.business.EmailSenderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailSenderController {

    private final EmailSenderService mailSenderService;

    public EmailSenderController(EmailSenderService mailSenderService) {
        this.mailSenderService = mailSenderService;
    }

    @PostMapping("/send")
    private void sendMail(@RequestParam (name = "subject") String subject, @RequestParam (name = "body") String body) {
        mailSenderService.sendMail(subject, body);
    }
}
