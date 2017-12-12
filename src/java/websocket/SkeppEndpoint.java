/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package websocket;

import java.io.IOException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Fia
 */
@ServerEndpoint("/sankaskepp")
public class SkeppEndpoint {
    
    static Set<Session> sessions = new HashSet<>();
    
    
    @OnOpen //hanterar nya users/Sessioner
    public void open(Session user) throws IOException {
        sessions.add(user);
        user.getBasicRemote().sendText(buildUserData());
    }
    
    @OnClose //hanterar när sessioner avslutas
    public void close(Session user) throws IOException {
        sessions.remove(user);
        for(Session session:sessions) {
            session.getBasicRemote().sendText(buildUserData());
        }
    }

    @OnMessage //skickar medelanden
    public void onMessage(String message, Session user) throws IOException {
        
        String username = (String)user.getUserProperties().get("username");
        
        if(username == null) {
            user.getUserProperties().put("username", message);
            for(Session session:sessions) {
                session.getBasicRemote().sendText(buildUserData());
            }
        } else {
            Iterator<Session> iterator = sessions.iterator();
            while(iterator.hasNext()) {
                Session currentUser = iterator.next();
                currentUser.getBasicRemote().sendText(buildJsonData(username, message));
                
            }
        }
    }
    
    private String buildJsonData(String username, String message) {
        //skapa json
        JsonObject jsonObject = Json.createObjectBuilder()
                .add("username", username)
                .add("message", message).build();
        return jsonObject.toString();
    }
    
    private String buildUserData() {
        
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for(Session session:sessions) {
            try {
                String username = (String)session.getUserProperties().get("username");
                if(username != null) {
                    jsonArrayBuilder.add(
                    Json.createObjectBuilder().add("username", username).build()
                );
                }
            }
            catch (Exception e) {
                System.out.println("Error" + e.getMessage());
            }
        }
        return jsonArrayBuilder.build().toString();
    }
}
