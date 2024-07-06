import AlertPopupStyles from "@/styles/AlertPopupStyles";
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface SuccessPopupProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isVisible,
  message,
  onClose,
}) => (
  <Modal transparent={true} visible={isVisible} animationType="fade">
    <View style={AlertPopupStyles.popupOverlay}>
      <View style={AlertPopupStyles.popupContainer}>
        <Text style={AlertPopupStyles.popupMessage}>{message}</Text>
        <TouchableOpacity
          style={AlertPopupStyles.popupButton}
          onPress={onClose}
        >
          <Text style={AlertPopupStyles.popupButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default SuccessPopup;
