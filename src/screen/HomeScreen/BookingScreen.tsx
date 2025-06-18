import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

const tabs = ['Active', 'Upcoming', 'History'];

const bookings = [
  {
    id: '1',
    title: 'House Cleaning',
    subtitle: 'CleanPro Services',
    date: 'Today, 2:00 PM',
    status: 'In Progress',
    statusColor: '#00C853',
    action: 'Track',
  },
  {
    id: '2',
    title: 'Beauty Session',
    subtitle: 'Glow Beauty Spa',
    date: 'Tomorrow, 10:00 AM',
    status: 'Scheduled',
    statusColor: '#FFA000',
    action: 'Modify',
  },
];

const recurringServices = [
  {
    id: 'r1',
    title: 'Weekly House Cleaning',
    date: 'Every Monday, 9:00 AM',
    status: 'Weekly',
    statusColor: '#FFA000',
    action: 'Manage',
  },
];

const BookingScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bookings List */}
      {bookings.map(item => (
        <View key={item.id} style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            <Text style={styles.cardDate}>📅 {item.date}</Text>
            <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>{item.action}</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Recurring Services */}
      <Text style={styles.sectionTitle}>Recurring Services</Text>
      {recurringServices.map(item => (
        <View key={item.id} style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>📅 {item.date}</Text>
            <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>{item.action}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 16,
    flex: 1,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  tabText: {
    color: '#aaa',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ccc',
    marginBottom: 4,
  },
  cardDate: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: {
    color: '#000',
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default BookingScreen;
