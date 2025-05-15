package com.splitwise.server.repo;

import com.splitwise.server.dto.TransactionDTO;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    @Query("""
    SELECT u.id, u.name, COALESCE(SUM(t.amount), 0)\s
    FROM User u
    LEFT JOIN Transaction t ON u.id = t.payee.id AND t.group.id = :groupId AND t.settled = false
    WHERE u.id IN (
        SELECT ug.user.id FROM UserGroup ug WHERE ug.group.id = :groupId
    )
    GROUP BY u.id, u.name
""")
    List<Object[]> getTotalOwedPerUser(@Param("groupId") Long groupId);

    @Query("""
        SELECT SUM(t.amount), t.payer.id, u.name
        FROM Transaction t
        JOIN User u ON t.payer.id = u.id
        WHERE t.payee.id = :userId AND t.group.id = :groupId AND t.settled = false
        GROUP BY t.payer.id, u.name
    """)
    List<Object[]> getOweDetails(@Param("userId") Long userId, @Param("groupId") Long groupId);

    @Query("SELECT t FROM Transaction t WHERE t.group.id = :groupId")
    List<Transaction> findByGroupId(@Param("groupId") Long groupId);

    @Query("SELECT t FROM Transaction t WHERE (t.payee.id = :userId OR t.payer.id = :userId)")
    List<Transaction> findByUserId(@Param("userId") Long userId);

    public List<Transaction> findByPayerAndPayee(User payer, User payee);

    @Query("SELECT t FROM Transaction t WHERE t.type = 'FRIEND' AND " +
            "((t.payer = :user AND t.payee = :friend) OR (t.payer = :friend AND t.payee = :user))")
    List<Transaction> findByUsersInFriendContext(@Param("user") User user, @Param("friend") User friend);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.payer.id = :userId AND t.settled = false")
    BigDecimal findTotalOwedByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.payee.id = :userId AND t.settled = false")
    BigDecimal findTotalOwedToUser(@Param("userId") Long userId);

    @Query(value = "SELECT t FROM Transaction t " +
            "WHERE t.payer.id = :userId OR t.payee.id = :userId " +
            "ORDER BY t.date DESC")
    List<Transaction> last5Transactions(@Param("userId") Long userId, Pageable pageable);
}
