module.exports = function (self) {

	let channelList = []
	for (let i = 1; i <= self.channelcount; i++) {
		let channelListObj = {}
		channelListObj.id = i
		channelListObj.label = 'Channel ' + i
		if (self.state['channel_name_' + i]) channelListObj.label += ` ( ${self.state['channel_name_' + i]} )`
		channelList.push(channelListObj)
	}

	self.setActionDefinitions({
		'get_all_status': {
			name: 'Get Updated Status of Device',
            options: [],
            callback: async () => {
                self.sendCmd('< GET ALL >')
            }
		},
		'device_mute': {
			name: 'Mute or Unmute Device',
			options: [
				{
					type: 'dropdown',
					label: 'Mute/Unmute/Toggle',
					id: 'choice',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'Mute'},
						{id: 'OFF', label: 'Unmute'},
						{id: 'TOGGLE', label: 'Toggle Mute/Unmute'}
					]
				}
			],
			callback: async ({options}) => {
				self.sendCmd('< SET DEVICE_AUDIO_MUTE ' + options.choice + ' >')
            }
		},
		'channel_mute': {
			name: 'Mute or Unmute Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel Number',
					id: 'channel',
					default: '1',
					choices: channelList
				},
				{
					type: 'dropdown',
					label: 'Mute/Unmute/Toggle',
					id: 'choice',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'Mute'},
						{id: 'OFF', label: 'Unmute'},
						{id: 'TOGGLE', label: 'Toggle Mute/Unmute'}
					]
				}
			],
			callback: async ({options}) => {
				self.sendCmd('< SET ' + options.channel + ' AUDIO_MUTE ' + options.choice + ' >')
            }
		},
		'channel_incrementgain': {
			name: 'Incremental change of Audio Gain of Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel Number',
					id: 'channel',
					default: '1',
					choices: channelList
				},
				{
					type: 'number',
					label: 'Gain Increment',
					id: 'gain',
					default: 0,
					min: -18,
					max: 18,
					steps: 0.1
				}
			],
			callback: async ({options}) => {
				let gain = 0
				if (typeof options.gain === 'number') {
					gain = Math.round(options.gain * 10)
				}
				let dir = 'INC'
				if (gain < 0) dir = 'DEC'

				self.sendCmd(`< SET ${options.channel} AUDIO_GAIN_HI_RES ${dir} ${gain} >`)
            }
		},
		'channel_setgain': {
			name: 'Set Audio Gain of Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel Number',
					id: 'channel',
					default: '1',
					choices: channelList
				},
				{
					type: 'number',
					label: 'Gain',
					id: 'gain',
					tooltip: 'Value in dB, Range is -110dB to +30dB, Steps of 0.1dB',
					default: 0,
					min: -110,
					max: 30,
					steps: 0.1
				}
			],
			callback: async ({options}) => {
				let gain = 1100
				if (typeof options.gain === 'number') {
					gain = Math.round(options.gain * 10 - 1100)
				}
				self.sendCmd(`< SET ${options.channel} AUDIO_GAIN_HI_RES ${gain} >`)
            }
		},
		'preset_recall': {
			name: 'Preset Recall',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Number',
					id: 'preset',
					default: '1',
					choices: [
						{id: '1', label: 'Preset 1'},
						{id: '2', label: 'Preset 2'},
						{id: '3', label: 'Preset 3'},
						{id: '4', label: 'Preset 4'},
						{id: '5', label: 'Preset 5'},
						{id: '6', label: 'Preset 6'},
						{id: '7', label: 'Preset 7'},
						{id: '8', label: 'Preset 8'},
						{id: '9', label: 'Preset 9'},
						{id: '10', label: 'Preset 10'}
					]
				}
			],
            callback: async ({options}) => {
                self.sendCmd(`< SET PRESET ${ options.preset } >`)
            }
		},
		'setup_led_muted': {
			name: 'Set muted LED behavior',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'On'},
						{id: 'OFF', label: 'Off'},
						{id: 'FLASHING', label: 'Flashing'},
					]
				},
				{
					type: 'dropdown',
					label: 'Color',
					id: 'color',
					default: 'RED',
					choices: [
						{id: 'RED', 		label: 'Red'},
						{id: 'ORANGE', 		label: 'Orange'},
						{id: 'GOLD', 		label: 'Gold'},
						{id: 'YELLOW', 		label: 'Yellow'},
						{id: 'YELLOWGREEN', label: 'Yellowgreen'},
						{id: 'GREEN', 		label: 'Green'},
						{id: 'TURQUOISE', 	label: 'Turquoise'},
						{id: 'POWDERBLUE', 	label: 'Powderblue'},
						{id: 'CYAN', 		label: 'Cyan'},
						{id: 'SKYBLUE', 	label: 'Skyblue'},
						{id: 'BLUE', 		label: 'Blue'},
						{id: 'PURPLE', 		label: 'Purple'},
						{id: 'LIGHTPURPLE', label: 'Lightpurple'},
						{id: 'VIOLET', 		label: 'Violet'},
						{id: 'ORCHID', 		label: 'Orchid'},
						{id: 'PINK', 		label: 'Pink'},
						{id: 'WHITE', 		label: 'White'},
					]
				}
			],
            callback: async ({options}) => {
                self.sendCmd(`< SET LED_STATE_MUTED ${ options.state } >< SET LED_COLOR_MUTED ${ options.color } >`)
            }
		},
		'setup_led_unmuted': {
			name: 'Set unmuted LED behavior',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'On'},
						{id: 'OFF', label: 'Off'},
						{id: 'FLASHING', label: 'Flashing'},
					]
				},
				{
					type: 'dropdown',
					label: 'Color',
					id: 'color',
					default: 'GREEN',
					choices: [
						{id: 'RED', 		label: 'Red'},
						{id: 'ORANGE', 		label: 'Orange'},
						{id: 'GOLD', 		label: 'Gold'},
						{id: 'YELLOW', 		label: 'Yellow'},
						{id: 'YELLOWGREEN', label: 'Yellowgreen'},
						{id: 'GREEN', 		label: 'Green'},
						{id: 'TURQUOISE', 	label: 'Turquoise'},
						{id: 'POWDERBLUE', 	label: 'Powderblue'},
						{id: 'CYAN', 		label: 'Cyan'},
						{id: 'SKYBLUE', 	label: 'Skyblue'},
						{id: 'BLUE', 		label: 'Blue'},
						{id: 'PURPLE', 		label: 'Purple'},
						{id: 'LIGHTPURPLE', label: 'Lightpurple'},
						{id: 'VIOLET', 		label: 'Violet'},
						{id: 'ORCHID', 		label: 'Orchid'},
						{id: 'PINK', 		label: 'Pink'},
						{id: 'WHITE', 		label: 'White'},
					]
				}
			],
            callback: async ({options}) => {
                self.sendCmd(`< SET LED_STATE_UNMUTED ${ options.state } >< SET LED_COLOR_UNMUTED ${ options.color } >`)
            }
		},
		'set_led_state': {
			name: 'Force LED state',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'Unmute State'},
						{id: 'OFF', label: 'Mute State'},
					]
				},
			],
            callback: async ({options}) => {
                self.sendCmd(`< SET DEV_LED_IN_STATE  ${ options.state } >`)
            }
		},
		'flash_lights': {
			name: 'Flash Lights on Device',
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'onoff',
					default: 'ON',
					choices: [
						{id: 'OFF', label: 'Off'},
						{id: 'ON', label: 'On'}
					]
				}
			],
            callback: async ({options}) => {
                self.sendCmd(`< SET FLASH ${ options.onoff } >`)
            }
		},
		'reboot': {
			name: 'Reboot the Device',
            options: [],
            callback: async () => {
                self.sendCmd('< SET REBOOT >')
            }
		}
	})
}