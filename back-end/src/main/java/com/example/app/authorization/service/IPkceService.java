package com.example.app.authorization.service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

public interface IPkceService {
    String generateCodeVerifier() throws UnsupportedEncodingException;
    String generateCodeChallenge(String codeVerifier) throws UnsupportedEncodingException, NoSuchAlgorithmException;
}
