import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Users, Calendar, Info } from 'lucide-react';

const EventRegistration = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [teamId, setTeamId] = useState('');
  const [userIds, setUserIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [eventStats, setEventStats] = useState(null);

  const API_BASE_URL = 'https://avalanche.git.edu/api';

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch event stats when event is selected
  useEffect(() => {
    if (selectedEvent) {
      fetchEventStats(selectedEvent.id);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch events');
      
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      setMessage({ type: 'error', text: `Error fetching events: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const fetchEventStats = async (eventId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch event stats');
      
      const data = await response.json();
      setEventStats(data);
    } catch (error) {
      console.error('Error fetching event stats:', error);
      setEventStats(null);
    }
  };

  const handleEventSelect = (e) => {
    const eventId = e.target.value;
    const event = events.find(ev => ev.id === eventId);
    setSelectedEvent(event);
    setEventStats(null);
    setMessage(null);
  };

  const handleRegister = async () => {
    if (!selectedEvent) {
      setMessage({ type: 'error', text: 'Please select an event' });
      return;
    }

    if (!teamId.trim()) {
      setMessage({ type: 'error', text: 'Please enter a team ID' });
      return;
    }

    if (!userIds.trim()) {
      setMessage({ type: 'error', text: 'Please enter at least one user ID' });
      return;
    }

    const userIdArray = userIds
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0);

    if (userIdArray.length === 0) {
      setMessage({ type: 'error', text: 'Please enter valid user IDs' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch(`${API_BASE_URL}/events/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIds: userIdArray,
          eventId: selectedEvent.id,
          teamId: teamId.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (data.unpaidUsers) {
          setMessage({ 
            type: 'error', 
            text: `Payment Required: ${data.unpaidUsers.map(u => u.name).join(', ')}`,
            details: data.message
          });
        } else if (data.alreadyRegistered) {
          setMessage({ 
            type: 'error', 
            text: `Already Registered: ${data.alreadyRegistered.join(', ')}`
          });
        } else if (data.invalidUsers) {
          setMessage({ 
            type: 'error', 
            text: `Invalid Users: ${data.invalidUsers.join(', ')}`
          });
        } else {
          setMessage({ type: 'error', text: data.error || 'Registration failed' });
        }
        return;
      }

      setMessage({ 
        type: 'success', 
        text: `Successfully registered ${data.count} user(s) for ${selectedEvent.EventName || selectedEvent.name}!`,
        details: `Team: ${teamId}, Members: ${userIdArray.join(', ')}`
      });
      
      // Clear form
      setUserIds('');
      setTeamId('');
      
      // Refresh event stats
      fetchEventStats(selectedEvent.id);
    } catch (error) {
      setMessage({ type: 'error', text: `Registration error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              Event Registration
            </h1>
            <p className="mt-2 text-purple-100">Register your team for events</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                message.type === 'error' 
                  ? 'bg-red-50 text-red-800 border border-red-200' 
                  : 'bg-green-50 text-green-800 border border-green-200'
              }`}>
                {message.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{message.text}</p>
                  {message.details && (
                    <p className="text-sm mt-1 opacity-90">{message.details}</p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Event Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Event *
                </label>
                <select
                  value={selectedEvent?.id || ''}
                  onChange={handleEventSelect}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={loading}
                >
                  <option value="">-- Choose an Event --</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.EventName || event.name} 
                      {event.EventCategory && ` (${event.EventCategory})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Details */}
              {selectedEvent && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-blue-900">
                        {selectedEvent.EventName || selectedEvent.name}
                      </h3>
                      {selectedEvent.EventDescription && (
                        <p className="text-sm text-blue-800">
                          {selectedEvent.EventDescription}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-blue-900">Team Size:</span>
                          <span className="ml-2 text-blue-700">
                            {selectedEvent.EventTeamMinSize || 1} - {selectedEvent.EventTeamMaxSize || 'Unlimited'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-900">Max Registrations:</span>
                          <span className="ml-2 text-blue-700">
                            {selectedEvent.EventMaxReg === -1 ? 'Unlimited' : selectedEvent.EventMaxReg}
                          </span>
                        </div>
                      </div>
                      
                      {eventStats && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-sm font-medium text-blue-900">Current Stats:</p>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                            <div>
                              <span className="text-blue-700">Teams: </span>
                              <span className="font-semibold text-blue-900">
                                {eventStats.currentStats.totalTeams}
                              </span>
                            </div>
                            <div>
                              <span className="text-blue-700">Participants: </span>
                              <span className="font-semibold text-blue-900">
                                {eventStats.currentStats.totalParticipants}
                              </span>
                            </div>
                            {eventStats.currentStats.spotsRemaining !== 'Unlimited' && (
                              <div className="col-span-2">
                                <span className="text-blue-700">Spots Remaining: </span>
                                <span className={`font-semibold ${
                                  eventStats.currentStats.spotsRemaining < 10 
                                    ? 'text-red-600' 
                                    : 'text-green-600'
                                }`}>
                                  {eventStats.currentStats.spotsRemaining}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Team ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Team ID *
                </label>
                <input
                  type="text"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  placeholder="e.g., TEAM_ALPHA, INVICTUS_01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a unique team identifier
                </p>
              </div>

              {/* User IDs */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  User IDs (Avalanche IDs) *
                </label>
                <textarea
                  value={userIds}
                  onChange={(e) => setUserIds(e.target.value)}
                  placeholder="AVA20250040, AVA20250041, AVA20250042"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter Avalanche IDs separated by commas
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleRegister}
                disabled={loading || !selectedEvent}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Register Team
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-3">📝 Registration Requirements:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>All team members must have completed payment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Team size must be within event limits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Each user can only register once per event</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Use valid Avalanche IDs (e.g., AVA20250040)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;