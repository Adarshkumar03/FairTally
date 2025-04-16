package com.splitwise.server.service;

import com.splitwise.server.dto.FriendDTO;
import com.splitwise.server.model.Friendship;
import com.splitwise.server.model.User;
import com.splitwise.server.repo.FriendshipRepo;
import com.splitwise.server.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class FriendshipService {

    private final FriendshipRepo friendshipRepository;
    private final UserRepo userRepository;

    @Autowired
    public FriendshipService(FriendshipRepo friendshipRepository, UserRepo userRepository) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    public void addFriend(Long userId, Long friendId) throws Exception {
        if (userId.equals(friendId)) {
            throw new Exception("You cannot add yourself as a friend");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new Exception("Friend not found"));

        if (friendshipRepository.findByUserIdAndFriendId(userId, friendId).isPresent()) {
            throw new Exception("Friendship already exists");
        }

        Friendship friendship = new Friendship(user, friend);
        friendshipRepository.save(friendship);
    }

    public List<FriendDTO> getAllFriends(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Set<Friendship> initiated = user.getFriends();
        Set<Friendship> received = user.getFriendOf();

        List<FriendDTO> friends = new ArrayList<>();

        for (Friendship f : initiated) {
            friends.add(new FriendDTO(f.getFriend().getId(), f.getFriend().getName(), f.getFriend().getEmail()));
        }

        for (Friendship f : received) {
            friends.add(new FriendDTO(f.getUser().getId(), f.getUser().getName(), f.getUser().getEmail()));
        }

        return friends;
    }

    public void removeFriend(Long userId, Long friendId) {
        Friendship friendship = friendshipRepository.findByUserIds(userId, friendId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship not found"));

        friendshipRepository.delete(friendship);
    }
}
