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
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    {user.name} Owes
                </h2>

                {oweDetails.length > 0 ? (
                    <ul className="space-y-2">
                        {oweDetails.map((debt) => (
                            <li key={debt.payerId} className="flex justify-between border-b pb-2">
                                <span>{debt.payerName}</span>
                                <span className="font-semibold text-red-500">₹{debt.totalOwed}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No outstanding debts</p>
                )}

                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default OweDetailsModal;