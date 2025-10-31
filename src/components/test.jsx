import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Users, Calendar, Info, Loader2, RefreshCw } from 'lucide-react';

const EventRegistration = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [teamId, setTeamId] = useState('');
  const [userIds, setUserIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingEvents, setFetchingEvents] = useState(true);
  const [message, setMessage] = useState(null);
  const [eventStats, setEventStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const API_BASE_URL = 'https://avalanche.git.edu/api';
  const MAX_RETRIES = 3;

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

  const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        // If 502/503, retry after delay
        if ((response.status === 502 || response.status === 503) && i < retries - 1) {
          console.log(`🔄 Retry ${i + 1}/${retries - 1} after ${response.status} error`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }

        return response;
      } catch (error) {
        if (i < retries - 1) {
          console.log(`🔄 Retry ${i + 1}/${retries - 1} after network error`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
        throw error;
      }
    }
  };

  const fetchEvents = async () => {
    try {
      setFetchingEvents(true);
      setMessage(null);
      console.log('🔄 Fetching events from:', `${API_BASE_URL}/events`);
      
      const response = await fetchWithRetry(`${API_BASE_URL}/events`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 502 || response.status === 503) {
          throw new Error('Server is temporarily unavailable. Please try again in a moment.');
        }
        
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch events`);
      }
      
      const data = await response.json();
      console.log('✅ Events fetched:', data.count || data.events?.length || 0);
      setEvents(data.events || []);
      setRetryCount(0);
      
      if (!data.events || data.events.length === 0) {
        setMessage({ 
          type: 'error', 
          text: 'No events available. Please contact the administrator.' 
        });
      }
    } catch (error) {
      console.error('❌ Error fetching events:', error);
      setRetryCount(prev => prev + 1);
      setMessage({ 
        type: 'error', 
        text: `Unable to load events: ${error.message}`,
        details: retryCount < MAX_RETRIES ? 'Please try refreshing the page.' : 'The server may be down. Please contact support if this persists.'
      });
    } finally {
      setFetchingEvents(false);
    }
  };

  const fetchEventStats = async (eventId) => {
    try {
      setLoadingStats(true);
      console.log('📊 Fetching stats for event:', eventId);
      
      const response = await fetchWithRetry(`${API_BASE_URL}/events/${eventId}/stats`, {
        method: 'GET',
      }, 2); // Fewer retries for stats

      if (!response.ok) {
        throw new Error('Failed to fetch event stats');
      }
      
      const data = await response.json();
      console.log('✅ Stats fetched:', data);
      setEventStats(data);
    } catch (error) {
      console.error('❌ Error fetching event stats:', error);
      setEventStats(null);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleEventSelect = (e) => {
    const eventId = e.target.value;
    const event = events.find(ev => ev.id === eventId);
    setSelectedEvent(event);
    setEventStats(null);
    setMessage(null);
    console.log('📌 Event selected:', eventId, event);
  };

  const validateInputs = () => {
    if (!selectedEvent) {
      setMessage({ type: 'error', text: 'Please select an event' });
      return false;
    }

    if (!teamId.trim()) {
      setMessage({ type: 'error', text: 'Please enter a team ID' });
      return false;
    }

    if (!userIds.trim()) {
      setMessage({ type: 'error', text: 'Please enter at least one user ID' });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setMessage(null);

    if (!validateInputs()) {
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

    const invalidIds = userIdArray.filter(id => !id.match(/^AVA\d{8}$/));
    if (invalidIds.length > 0) {
      setMessage({ 
        type: 'error', 
        text: 'Invalid Avalanche ID format detected',
        details: `Invalid IDs: ${invalidIds.join(', ')}. Format should be AVA20250040`
      });
      return;
    }

    try {
      setLoading(true);
      console.log('🎯 Registering team:', {
        eventId: selectedEvent.id,
        teamId: teamId.trim(),
        userIds: userIdArray
      });

      const requestBody = {
        userIds: userIdArray,
        eventId: selectedEvent.id,
        teamId: teamId.trim(),
      };

      console.log('📤 Request payload:', JSON.stringify(requestBody, null, 2));

      const response = await fetchWithRetry(`${API_BASE_URL}/events/register`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('📥 Response:', data);

      if (!response.ok) {
        if (data.unpaidUsers && data.unpaidUsers.length > 0) {
          const unpaidList = data.unpaidUsers.map(u => 
            `${u.name} (${u.avalancheId})`
          ).join(', ');
          
          setMessage({ 
            type: 'error', 
            text: 'Payment Required',
            details: `These users must complete payment: ${unpaidList}`
          });
        } else if (data.alreadyRegistered && data.alreadyRegistered.length > 0) {
          setMessage({ 
            type: 'error', 
            text: 'Already Registered',
            details: `These users are already registered: ${data.alreadyRegistered.join(', ')}`
          });
        } else if (data.invalidUsers && data.invalidUsers.length > 0) {
          setMessage({ 
            type: 'error', 
            text: 'Invalid Users',
            details: `These user IDs were not found: ${data.invalidUsers.join(', ')}`
          });
        } else if (data.spotsAvailable !== undefined) {
          setMessage({ 
            type: 'error', 
            text: data.error,
            details: `Only ${data.spotsAvailable} spot(s) remaining`
          });
        } else {
          setMessage({ 
            type: 'error', 
            text: data.error || 'Registration failed',
            details: data.details || 'Please try again or contact support'
          });
        }
        return;
      }

      setMessage({ 
        type: 'success', 
        text: `✨ Successfully registered ${data.count} user(s)!`,
        details: `Event: ${selectedEvent.EventName || selectedEvent.name} | Team: ${teamId}`
      });
      
      setUserIds('');
      setTeamId('');
      
      if (selectedEvent) {
        fetchEventStats(selectedEvent.id);
      }
      
      console.log('✅ Registration successful');
    } catch (error) {
      console.error('❌ Registration error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Registration failed',
        details: error.message || 'Network error. Please check your connection.'
      });
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
            {/* Loading Events State */}
            {fetchingEvents && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin mb-3" />
                <span className="text-gray-600">Loading events...</span>
                {retryCount > 0 && (
                  <span className="text-sm text-gray-500 mt-2">
                    Retry attempt {retryCount}/{MAX_RETRIES}
                  </span>
                )}
              </div>
            )}

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

            {/* Retry Button for Failed Load */}
            {!fetchingEvents && events.length === 0 && message?.type === 'error' && (
              <div className="text-center py-8">
                <button
                  onClick={fetchEvents}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Loading Events
                </button>
              </div>
            )}

            {!fetchingEvents && events.length > 0 && (
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
                        {(event.EventCategory || event.category) && ` (${event.EventCategory || event.category})`}
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
                        {(selectedEvent.EventDescription || selectedEvent.description) && (
                          <p className="text-sm text-blue-800">
                            {selectedEvent.EventDescription || selectedEvent.description}
                          </p>
                        )}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-blue-900">Team Size:</span>
                            <span className="ml-2 text-blue-700">
                              {selectedEvent.EventTeamMinSize || selectedEvent.minTeamSize || 1} - {selectedEvent.EventTeamMaxSize || selectedEvent.maxTeamSize || 'Unlimited'}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-blue-900">Max Registrations:</span>
                            <span className="ml-2 text-blue-700">
                              {(selectedEvent.EventMaxReg === -1 || selectedEvent.maxRegistrations === -1) ? 'Unlimited' : (selectedEvent.EventMaxReg || selectedEvent.maxRegistrations)}
                            </span>
                          </div>
                        </div>
                        
                        {loadingStats && (
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-200">
                            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                            <span className="text-sm text-blue-700">Loading stats...</span>
                          </div>
                        )}

                        {eventStats && !loadingStats && (
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
                                  {eventStats.currentStats.isFull && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                      FULL
                                    </span>
                                  )}
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
                    Enter Avalanche IDs separated by commas (Format: AVA20250040)
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleRegister}
                  disabled={loading || !selectedEvent || fetchingEvents}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
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
            )}
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
              <span>Use valid Avalanche IDs in format: AVA20250040</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Multiple IDs should be separated by commas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;