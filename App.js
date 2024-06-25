import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { joinZoomMeeting } from './zoomApi';

export default function App() {
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [meetingId, setMeetingId] = useState('82129277622'); 
  const [password, setPassword] = useState('099728');

  const handleJoinMeeting = async () => {
    try {
      const meeting = await joinZoomMeeting(meetingId, password);
      setMeetingInfo(meeting);
    } catch (error) {
      console.error("Error al unirse a la reunión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Información de la Reunión Zoom</Title>
          {meetingInfo ? (
            <Paragraph>{JSON.stringify(meetingInfo, null, 2)}</Paragraph>
          ) : (
            <Paragraph>No hay información de la reunión disponible.</Paragraph>
          )}
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.button} onPress={handleJoinMeeting}>
        Unirse a la Reunión
      </Button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});
