import { useEffect, useState } from "react";
import api from "../../utils/api";

const OweDetailsModal = ({ user, groupId, onClose }) => {
    const [oweDetails, setOweDetails] = useState([]);

    useEffect(() => {
        if (!user || !groupId) return;

        const fetchOweDetails = async () => {
            try {
                const response = await api.get(`/transactions/owe-details?userId=${user.id}&groupId=${groupId}`);
                setOweDetails(response.data);
            } catch (error) {
                console.error("Error fetching owe details:", error);
            }
        };

        fetchOweDetails();
    }, [user, groupId]);

    if (!user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-[#FEF5E4] w-96 p-6 rounded-lg shadow-lg relative">
                {/* Modal Header */}
                <h2 className="text-xl font-bold text-[#030C03] text-center">
                    {user.name} <span className="text-[#F7C236] font-semibold">Owes</span>
                </h2>

                {/* Owe Details List */}
                {oweDetails.length > 0 ? (
                    <ul className="space-y-3 mt-4">
                        {oweDetails.map((debt) => (
                            <li key={debt.payerId} className="flex justify-between text-[#030C03] px-2 py-1">
                                <span className="font-medium">{debt.payerName}</span>
                                <span className="font-semibold text-red-600">₹{debt.totalOwed}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600 mt-4">No outstanding debts</p>
                )}

                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-[#909CC2] hover:text-red-500 text-xl font-bold transition"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default OweDetailsModal;
