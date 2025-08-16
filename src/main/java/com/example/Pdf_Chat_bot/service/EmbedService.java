package com.example.Pdf_Chat_bot.service;

import com.example.Pdf_Chat_bot.AIDtos.HuggingFaceRequest;
import com.example.Pdf_Chat_bot.Dto.EmbedingDate;
import com.example.Pdf_Chat_bot.Dto.EmbedingRequest;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class EmbedService {
    private final RestTemplate restTemplate;
    private final DeepSeekService deepSeekService;
    public EmbedService(RestTemplate restTemplate, DeepSeekService deepSeekService){
        this.restTemplate=restTemplate;
        this.deepSeekService = deepSeekService;
    }
    public List<List<Double>> getEmbeddings(List<String> texts) {


        // Base URL for Gradio API predict call
        String baseUrl = "https://bahaakhaled-pdf-embedding-service.hf.space/gradio_api/call/predict";

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", "application/json");

        EmbedingDate embedingDate =new EmbedingDate(texts);
        List<EmbedingDate> data =new LinkedList<>();
        data.add(embedingDate);
        EmbedingRequest embedingRequest =new EmbedingRequest(data);
        HttpEntity<EmbedingRequest> request = new HttpEntity<>(embedingRequest, headers);

        // Step 1: POST request to get event_id
        ResponseEntity<Map> postResponse = restTemplate.exchange(
                baseUrl,
                HttpMethod.POST,
                request,
                Map.class
        );

        // Extract event_id from POST response
        String eventId = (String) postResponse.getBody().get("event_id");

        if (eventId == null) {
            throw new RuntimeException("Failed to get event_id from embedding API");
        }

        // Step 2: GET request to fetch embeddings using event_id
        String getUrl = baseUrl + "/" + eventId;

        ResponseEntity<String> getResponse = restTemplate.exchange(
                getUrl,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class
        );
        String body = getResponse.getBody();
        int index = body.indexOf("data:");
        body = body.substring(index+"data:".length()).trim();
        ObjectMapper mapper = new ObjectMapper();
        try {
            List<List<List<Double>>> list = mapper.readValue(body, new TypeReference<List<List<List<Double>>>>() {});
            return list.get(0);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Double cosineSimilarity(List<Double> vecA, List<Double> vecB) {

        if (vecA.size() != vecB.size()) throw new IllegalArgumentException("Vectors must be same size");
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < vecA.size(); i++) {
            dotProduct += vecA.get(i) * vecB.get(i);
            normA += Math.pow(vecA.get(i), 2);
            normB += Math.pow(vecB.get(i), 2);
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }









}
