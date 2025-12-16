import React, { useState } from "react";
import {
    Modal,
    View,
    StyleSheet,
} from "react-native";
import { AppColors } from "../../../theme/colors";
import CauseHeader from "../CauseSelection/CauseHeader";
import CauseCard, { Cause } from "../CauseSelection/CauseCard";
import CauseFooter from "../CauseSelection/CauseFooter";

const CAUSES: Cause[] = [
    {
        id: "1",
        title: "Forest Restoration",
        description: "Help plant trees and restore forests.",
        image: require("../../../assets/walkAndEarn/portfolio/p1.png"),
    },
    {
        id: "2",
        title: "Clean Water Access",
        description: "Provide clean water to communities.",
        image: require("../../../assets/walkAndEarn/portfolio/p2.png"),
    },
    {
        id: "3",
        title: "Food Security",
        description: "Fight hunger and malnutrition.",
        image: require("../../../assets/walkAndEarn/portfolio/p3.png"),
    },
    {
        id: "4",
        title: "Eco Education",
        description: "Support women's rights and education.",
        image: require("../../../assets/walkAndEarn/portfolio/p4.png"),
    },
    {
        id: "5",
        title: "Kids Walks for Labudu ",
        description: "Earn Labubu Eco-Collections with every step ",
        image: require("../../../assets/walkAndEarn/portfolio/p5.png"),
    },
];

interface CauseSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    onCauseSelection: (selectedCause: Cause | null) => void;
}

const CauseSelectionModal: React.FC<CauseSelectionModalProps> = ({
    visible,
    onClose,
    onCauseSelection,
}) => {
    const [selectedCauseId, setSelectedCauseId] = useState<string | null>(null);

    const handleStart = () => {
        const cause = CAUSES.find((c) => c.id === selectedCauseId) || null;
        onCauseSelection(cause);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header */}
                    <CauseHeader onClose={onClose} />

                    {/* Grid */}
                    <View style={styles.gridContainer}>
                        {CAUSES.map((cause) => {
                            return (
                                <CauseCard
                                    key={cause.id}
                                    cause={cause}
                                    isSelected={selectedCauseId === cause.id}
                                    onSelect={setSelectedCauseId}
                                />
                            );
                        })}
                    </View>

                    {/* Footer Buttons */}
                    <CauseFooter
                        onCancel={onClose}
                        onStart={handleStart}
                        isStartDisabled={!selectedCauseId}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    container: {
        width: "100%",
        maxWidth: 400,
        borderRadius: 24,
        padding: 24,
        gap: 20,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
});

export default CauseSelectionModal;
