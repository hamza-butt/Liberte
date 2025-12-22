import React, { useState } from "react";
import {
    Modal,
    View,
    StyleSheet,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { AppColors } from "../../../theme/colors";
import CauseHeader from "../CauseSelection/CauseHeader";
import CauseCard, { Cause } from "../CauseSelection/CauseCard";
import CauseFooter from "../CauseSelection/CauseFooter";

import { CAUSES } from "../CauseSelection/CauseData";


interface CauseSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    onCauseSelection: (selectedCauseId: number) => void;
}

const CauseSelectionModal: React.FC<CauseSelectionModalProps> = ({
    visible,
    onClose,
    onCauseSelection,
}) => {
    const [selectedCauseId, setSelectedCauseId] = useState<number | null>(null);

    const handleStart = () => {
        if (selectedCauseId !== null) {
            onCauseSelection(selectedCauseId);
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={10}
                />
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
