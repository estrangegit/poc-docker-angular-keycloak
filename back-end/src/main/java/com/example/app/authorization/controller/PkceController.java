package com.example.app.authorization.controller;

import com.example.app.authorization.service.IPkceService;
import com.google.common.collect.Maps;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/api/pkce")
@RequiredArgsConstructor
public class PkceController {
    private final IPkceService pkceService;

    @GetMapping("/code")
    public ResponseEntity<Map<String, String>> generateCodeVerifierAndCodeChallenge() throws UnsupportedEncodingException, NoSuchAlgorithmException {

        String codeVerifier = this.pkceService.generateCodeVerifier();
        String codeChallenge = this.pkceService.generateCodeChallenge(codeVerifier);

        Map<String, String> codes = Maps.newHashMap();
        codes.put("codeVerifier", codeVerifier);
        codes.put("codeChallenge", codeChallenge);

        return ResponseEntity.status(200).body(codes);
    }
}
