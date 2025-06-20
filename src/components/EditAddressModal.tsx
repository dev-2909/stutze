import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
const containerHeight = Dimensions.get('window').height;
const EditAddressModal = ({
  isEditModalVisible,
  setEditModalVisible,
  setSelectedAddress,
  selectedAddress,
  handleSaveEdit,
}: {
  isEditModalVisible: boolean;
  setEditModalVisible: (visible: boolean) => void;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      address: string;
      flatNo?: string;
      landmark?: string;
      label?: 'Home' | 'Work' | 'Other';
    } | null>
  >;
  selectedAddress: {
    title: string;
    address: string;
    flatNo?: string;
    landmark?: string;
    label?: 'Home' | 'Work' | 'Other';
  } | null;
  handleSaveEdit: () => void;
}) => {
  return (
    <Modal
      visible={isEditModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setEditModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Address</Text>

          {/* Title Input */}
          {/* <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#AAAAAA"
            value={selectedAddress?.title}
            onChangeText={text =>
              setSelectedAddress(prev => (prev ? {...prev, title: text} : prev))
            }
          /> */}

          {/* Address Input */}
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#AAAAAA"
            value={selectedAddress?.address}
            onChangeText={text =>
              setSelectedAddress(prev =>
                prev ? {...prev, address: text} : prev,
              )
            }
          />

          {/* Flat No Input */}
          <TextInput
            style={styles.input}
            placeholder="Flat, House No., Building"
            placeholderTextColor="#AAAAAA"
            value={selectedAddress?.flatNo}
            onChangeText={text =>
              setSelectedAddress(prev =>
                prev ? {...prev, flatNo: text} : prev,
              )
            }
          />

          {/* Landmark Input */}
          <TextInput
            style={styles.input}
            placeholder="Landmark (optional)"
            placeholderTextColor="#AAAAAA"
            value={selectedAddress?.landmark}
            onChangeText={text =>
              setSelectedAddress(prev =>
                prev ? {...prev, landmark: text} : prev,
              )
            }
          />

          {/* Label Selection */}
          <Text style={styles.sectionLabel}>Save As</Text>
          <View style={styles.labelRow}>
            {(['Home', 'Work', 'Other'] as const).map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.labelButton,
                  selectedAddress?.title === item && styles.labelSelected,
                ]}
                onPress={() =>
                  setSelectedAddress(prev =>
                    prev ? {...prev, title: item} : prev,
                  )
                }>
                <Text
                  style={[
                    styles.labelText,
                    selectedAddress?.title === item && styles.labelSelectedText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveEdit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditAddressModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
    height: containerHeight / 1.8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#1F1F1F',
    color: '#FFFFFF',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  labelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
  },
  labelSelected: {
    backgroundColor: '#FF4C4C',
    borderColor: '#FF4C4C',
  },
  labelText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  labelSelectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
