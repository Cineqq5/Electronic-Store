package com.example.onlineshop.Services;

import com.example.onlineshop.Entities.Client;
import com.example.onlineshop.repositories.ClientRepo;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    private final ClientRepo clientRepo;

    public ClientService(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }

    public Client saveClient(Client client)
    {
        return this.clientRepo.save(client);
    }
}
