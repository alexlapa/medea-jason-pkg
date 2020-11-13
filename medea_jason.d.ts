/* tslint:disable */
/* eslint-disable */
/**
* [MediaStreamTrack.kind][1] representation.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediastreamtrack-kind
*/
export enum MediaKind {
/**
* Audio track.
*/
  Audio,
/**
* Video track.
*/
  Video,
}
/**
* Describes the directions that the camera can face, as seen from the user's
* perspective. Representation of [VideoFacingModeEnum][1].
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-videofacingmodeenum
*/
export enum FacingMode {
/**
* Facing toward the user (a self-view camera).
*/
  User,
/**
* Facing away from the user (viewing the environment).
*/
  Environment,
/**
* Facing to the left of the user.
*/
  Left,
/**
* Facing to the right of the user.
*/
  Right,
}
/**
* Media source type.
*/
export enum MediaSourceKind {
/**
* Media is sourced from some media device (webcam or microphone).
*/
  Device,
/**
* Media is obtained with screen-capture.
*/
  Display,
}
/**
* Constraints applicable to audio tracks.
*/
export class AudioTrackConstraints {
  free(): void;
/**
* Creates new [`AudioTrackConstraints`] with none constraints configured.
*/
  constructor();
/**
* Sets exact [deviceId][1] constraint.
*
* [1]: https://w3.org/TR/mediacapture-streams/#def-constraint-deviceId
* @param {string} device_id
*/
  device_id(device_id: string): void;
}
/**
* Connection with a specific remote `Member`, that is used on JS side.
*
* Actually, represents a [`Weak`]-based handle to `InnerConnection`.
*/
export class ConnectionHandle {
  free(): void;
/**
* Sets callback, which will be invoked when this `Connection` will close.
* @param {Function} f
*/
  on_close(f: Function): void;
/**
* Returns remote `Member` ID.
* @returns {string}
*/
  get_remote_member_id(): string;
/**
* Sets callback, which will be invoked when new remote
* [`MediaStreamTrack`] will be added to this [`Connection`].
* @param {Function} f
*/
  on_remote_track_added(f: Function): void;
/**
* Sets callback, which will be invoked when connection quality score will
* be updated by server.
* @param {Function} f
*/
  on_quality_score_update(f: Function): void;
}
/**
* Constraints applicable to video tracks that are sourced from some media
* device.
*/
export class DeviceVideoTrackConstraints {
  free(): void;
/**
* Creates new [`DeviceVideoTrackConstraints`] with none constraints
* configured.
*/
  constructor();
/**
* Sets exact [deviceId][1] constraint.
*
* [1]: https://w3.org/TR/mediacapture-streams/#def-constraint-deviceId
* @param {string} device_id
*/
  device_id(device_id: string): void;
/**
* Sets exact [facingMode][1] constraint.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-constraindomstring
* @param {number} facing_mode
*/
  exact_facing_mode(facing_mode: number): void;
/**
* Sets ideal [facingMode][1] constraint.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-constraindomstring
* @param {number} facing_mode
*/
  ideal_facing_mode(facing_mode: number): void;
}
/**
* Constraints applicable to video tracks sourced from screen capture.
*/
export class DisplayVideoTrackConstraints {
  free(): void;
/**
* Creates new [`DisplayVideoTrackConstraints`] with none constraints
* configured.
*/
  constructor();
}
/**
* Representation of [MediaDeviceInfo][1].
*
* [1]: https://w3.org/TR/mediacapture-streams/#device-info
*/
export class InputDeviceInfo {
  free(): void;
/**
* Returns unique identifier for the represented device.
* @returns {string}
*/
  device_id(): string;
/**
* Returns kind of the represented device.
*
* This representation of [MediaDeviceInfo][1] ONLY for input device.
*
* [1]: https://w3.org/TR/mediacapture-streams/#device-info
* @returns {number}
*/
  kind(): number;
/**
* Returns label describing the represented device (for example
* "External USB Webcam").
* If the device has no associated label, then returns an empty string.
* @returns {string}
*/
  label(): string;
/**
* Returns group identifier of the represented device.
*
* Two devices have the same group identifier if they belong to the same
* physical device. For example, the audio input and output devices
* representing the speaker and microphone of the same headset have the
* same [groupId][1].
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediadeviceinfo-groupid
* @returns {string}
*/
  group_id(): string;
}
/**
* General library interface.
*
* Responsible for managing shared transports, local media
* and room initialization.
*/
export class Jason {
  free(): void;
/**
* Instantiates new [`Jason`] interface to interact with this library.
*/
  constructor();
/**
* Returns [`RoomHandle`] for [`Room`].
* @returns {RoomHandle}
*/
  init_room(): RoomHandle;
/**
* Returns handle to [`MediaManager`].
* @returns {MediaManagerHandle}
*/
  media_manager(): MediaManagerHandle;
/**
* Closes the provided [`Room`].
* @param {RoomHandle} room_to_delete
*/
  close_room(room_to_delete: RoomHandle): void;
/**
* Drops [`Jason`] API object, so all related objects (rooms, connections,
* streams etc.) respectively. All objects related to this [`Jason`] API
* object will be detached (you will still hold them, but unable to use).
*/
  dispose(): void;
}
/**
* Representation of app error exported to JS side.
*
* Contains JS side error if it the cause and trace information.
*/
export class JasonError {
  free(): void;
/**
* Returns name of error.
* @returns {string}
*/
  name(): string;
/**
* Returns message of errors.
* @returns {string}
*/
  message(): string;
/**
* Returns trace information of error.
* @returns {string}
*/
  trace(): string;
/**
* Returns JS side error if it the cause.
* @returns {Error | undefined}
*/
  source(): Error | undefined;
}
/**
* JS side handle to [`MediaManager`].
*
* [`MediaManager`] performs all media acquisition requests
* ([getUserMedia()][1]/[getDisplayMedia()][2]) and stores all received tracks
* for further reusage.
*
* [`MediaManager`] stores weak references to [`MediaStreamTrack`]s, so if
* there are no strong references to some track, then this track is stopped
* and deleted from [`MediaManager`].
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediadevices-getusermedia
* [2]: https://w3.org/TR/screen-capture/#dom-mediadevices-getdisplaymedia
*/
export class MediaManagerHandle {
  free(): void;
/**
* Returns array of [`InputDeviceInfo`] objects, which represent available
* media input and output devices, such as microphones, cameras, and so
* forth.
* @returns {Promise<any>}
*/
  enumerate_devices(): Promise<any>;
/**
* Returns [`MediaStreamTrack`]s objects, built from provided
* [`MediaStreamSettings`].
* @param {MediaStreamSettings} caps
* @returns {Promise<any>}
*/
  init_local_tracks(caps: MediaStreamSettings): Promise<any>;
}
/**
* [MediaStreamConstraints][1] wrapper.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediastreamconstraints
*/
export class MediaStreamSettings {
  free(): void;
/**
* Creates new [`MediaStreamConstraints`] with none constraints configured.
*/
  constructor();
/**
* Specifies the nature and settings of the audio [MediaStreamTrack][1].
*
* [1]: https://w3.org/TR/mediacapture-streams/#mediastreamtrack
* @param {AudioTrackConstraints} constraints
*/
  audio(constraints: AudioTrackConstraints): void;
/**
* Set constraints that will be used to obtain local video sourced from
* media device.
* @param {DeviceVideoTrackConstraints} constraints
*/
  device_video(constraints: DeviceVideoTrackConstraints): void;
/**
* Set constraints that will be used to capture local video from user
* display.
* @param {DisplayVideoTrackConstraints} constraints
*/
  display_video(constraints: DisplayVideoTrackConstraints): void;
}
/**
* Strong reference to [MediaStreamTrack][1].
*
* Track will be automatically stopped when there are no strong references
* left.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediastreamtrack
*/
export class MediaTrack {
  free(): void;
/**
* Returns underlying [`SysMediaStreamTrack`] from this
* [`MediaStreamTrack`].
* @returns {MediaStreamTrack}
*/
  get_track(): MediaStreamTrack;
/**
* Returns is this [`MediaStreamTrack`] enabled.
* @returns {boolean}
*/
  enabled(): boolean;
/**
* Sets callback, which will be invoked when this [`MediaStreamTrack`] is
* enabled.
* @param {Function} callback
*/
  on_enabled(callback: Function): void;
/**
* Sets callback, which will be invoked when this [`MediaStreamTrack`] is
* enabled.
* @param {Function} callback
*/
  on_disabled(callback: Function): void;
/**
* Returns a [`String`] set to `audio` if the track is an audio track and
* to `video`, if it is a video track.
* @returns {number}
*/
  kind(): number;
/**
* Returns a [`String`] set to `device` if track is sourced from some
* device (webcam/microphone) and to `display`, if track is captured via
* [MediaDevices.getDisplayMedia()][1].
*
* [1]: https://w3.org/TR/screen-capture/#dom-mediadevices-getdisplaymedia
* @returns {number}
*/
  media_source_kind(): number;
}
/**
* Handle that JS side can reconnect to the Medea media server on
* a connection loss with.
*
* This handle will be provided into `Room.on_connection_loss` callback.
*/
export class ReconnectHandle {
  free(): void;
/**
* Tries to reconnect after the provided delay in milliseconds.
*
* If [`RpcSession`] is already reconnecting then new reconnection attempt
* won't be performed. Instead, it will wait for the first reconnection
* attempt result and use it here.
* @param {number} delay_ms
* @returns {Promise<any>}
*/
  reconnect_with_delay(delay_ms: number): Promise<any>;
/**
* Tries to reconnect [`RpcSession`] in a loop with a growing backoff
* delay.
*
* The first attempt to reconnect is guaranteed to happen no earlier than
* `starting_delay_ms`.
*
* Also, it guarantees that delay between reconnection attempts won't be
* greater than `max_delay_ms`.
*
* After each reconnection attempt, delay between reconnections will be
* multiplied by the given `multiplier` until it reaches `max_delay_ms`.
*
* If [`RpcSession`] is already reconnecting then new reconnection attempt
* won't be performed. Instead, it will wait for the first reconnection
* attempt result and use it here.
*
* If `multiplier` is negative number than `multiplier` will be considered
* as `0.0`.
* @param {number} starting_delay_ms
* @param {number} multiplier
* @param {number} max_delay
* @returns {Promise<any>}
*/
  reconnect_with_backoff(starting_delay_ms: number, multiplier: number, max_delay: number): Promise<any>;
}
/**
* Reason of why [`Room`] has been closed.
*
* This struct is passed into `on_close_by_server` JS side callback.
*/
export class RoomCloseReason {
  free(): void;
/**
* `wasm_bindgen` getter for [`RoomCloseReason::reason`] field.
* @returns {string}
*/
  reason(): string;
/**
* `wasm_bindgen` getter for [`RoomCloseReason::is_closed_by_server`]
* field.
* @returns {boolean}
*/
  is_closed_by_server(): boolean;
/**
* `wasm_bindgen` getter for [`RoomCloseReason::is_err`] field.
* @returns {boolean}
*/
  is_err(): boolean;
}
/**
* JS side handle to `Room` where all the media happens.
*
* Actually, represents a [`Weak`]-based handle to `InnerRoom`.
*
* For using [`RoomHandle`] on Rust side, consider the `Room`.
*/
export class RoomHandle {
  free(): void;
/**
* Sets callback, which will be invoked when new [`Connection`] with some
* remote `Peer` is established.
* @param {Function} f
*/
  on_new_connection(f: Function): void;
/**
* Sets `on_close` callback, which will be invoked on [`Room`] close,
* providing [`RoomCloseReason`].
* @param {Function} f
*/
  on_close(f: Function): void;
/**
* Sets callback, which will be invoked when new local [`MediaStreamTrack`]
* will be added to this [`Room`].
* This might happen in such cases:
* 1. Media server initiates media request.
* 2. `disable_audio`/`enable_video` is called.
* 3. [`MediaStreamSettings`] updated via `set_local_media_settings`.
* @param {Function} f
*/
  on_local_track(f: Function): void;
/**
* Sets `on_failed_local_media` callback, which will be invoked on local
* media acquisition failures.
* @param {Function} f
*/
  on_failed_local_media(f: Function): void;
/**
* Sets `on_connection_loss` callback, which will be invoked on
* [`WebSocketRpcClient`] connection loss.
* @param {Function} f
*/
  on_connection_loss(f: Function): void;
/**
* Performs entering to a [`Room`] with the preconfigured authorization
* `token` for connection with media server.
*
* Establishes connection with media server (if it doesn't already exist).
* Fails if:
* - `on_failed_local_media` callback is not set
* - `on_connection_loss` callback is not set
* - unable to connect to media server.
*
* Effectively returns `Result<(), JasonError>`.
* @param {string} token
* @returns {Promise<any>}
*/
  join(token: string): Promise<any>;
/**
* Updates this [`Room`]s [`MediaStreamSettings`]. This affects all
* [`PeerConnection`]s in this [`Room`]. If [`MediaStreamSettings`] is
* configured for some [`Room`], then this [`Room`] can only send
* [`MediaStream`] that corresponds to this settings.
* [`MediaStreamSettings`] update will change [`MediaStream`] in all
* sending peers, so that might cause new [getUserMedia()][1] request.
*
* Media obtaining/injection errors are fired to `on_failed_local_media`
* callback.
*
* [`PeerConnection`]: crate::peer::PeerConnection
* [1]: https://tinyurl.com/rnxcavf
* @param {MediaStreamSettings} settings
* @returns {Promise<any>}
*/
  set_local_media_settings(settings: MediaStreamSettings): Promise<any>;
/**
* Disables outbound audio in this [`Room`].
* @returns {Promise<any>}
*/
  disable_audio(): Promise<any>;
/**
* Enables outbound audio in this [`Room`].
* @returns {Promise<any>}
*/
  enable_audio(): Promise<any>;
/**
* Disables outbound video.
*
* Affects only video with specific [`JsMediaSourceKind`] if specified.
* @param {number | undefined} source_kind
* @returns {Promise<any>}
*/
  disable_video(source_kind?: number): Promise<any>;
/**
* Enables outbound video.
*
* Affects only video with specific [`JsMediaSourceKind`] if specified.
* @param {number | undefined} source_kind
* @returns {Promise<any>}
*/
  enable_video(source_kind?: number): Promise<any>;
/**
* Disables inbound audio in this [`Room`].
* @returns {Promise<any>}
*/
  disable_remote_audio(): Promise<any>;
/**
* Disables inbound video in this [`Room`].
* @returns {Promise<any>}
*/
  disable_remote_video(): Promise<any>;
/**
* Enables inbound audio in this [`Room`].
* @returns {Promise<any>}
*/
  enable_remote_audio(): Promise<any>;
/**
* Enables inbound video in this [`Room`].
* @returns {Promise<any>}
*/
  enable_remote_video(): Promise<any>;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_reconnecthandle_free: (a: number) => void;
  readonly reconnecthandle_reconnect_with_delay: (a: number, b: number) => number;
  readonly reconnecthandle_reconnect_with_backoff: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_jason_free: (a: number) => void;
  readonly jason_new: () => number;
  readonly jason_init_room: (a: number) => number;
  readonly jason_media_manager: (a: number) => number;
  readonly jason_close_room: (a: number, b: number) => void;
  readonly jason_dispose: (a: number) => void;
  readonly __wbg_mediamanagerhandle_free: (a: number) => void;
  readonly mediamanagerhandle_enumerate_devices: (a: number) => number;
  readonly mediamanagerhandle_init_local_tracks: (a: number, b: number) => number;
  readonly __wbg_mediastreamsettings_free: (a: number) => void;
  readonly mediastreamsettings_new: () => number;
  readonly mediastreamsettings_audio: (a: number, b: number) => void;
  readonly mediastreamsettings_device_video: (a: number, b: number) => void;
  readonly mediastreamsettings_display_video: (a: number, b: number) => void;
  readonly __wbg_audiotrackconstraints_free: (a: number) => void;
  readonly audiotrackconstraints_new: () => number;
  readonly audiotrackconstraints_device_id: (a: number, b: number, c: number) => void;
  readonly devicevideotrackconstraints_new: () => number;
  readonly devicevideotrackconstraints_exact_facing_mode: (a: number, b: number) => void;
  readonly devicevideotrackconstraints_ideal_facing_mode: (a: number, b: number) => void;
  readonly __wbg_displayvideotrackconstraints_free: (a: number) => void;
  readonly displayvideotrackconstraints_new: () => number;
  readonly __wbg_devicevideotrackconstraints_free: (a: number) => void;
  readonly devicevideotrackconstraints_device_id: (a: number, b: number, c: number) => void;
  readonly __wbg_jasonerror_free: (a: number) => void;
  readonly jasonerror_name: (a: number, b: number) => void;
  readonly jasonerror_message: (a: number, b: number) => void;
  readonly jasonerror_trace: (a: number, b: number) => void;
  readonly jasonerror_source: (a: number) => number;
  readonly __wbg_connectionhandle_free: (a: number) => void;
  readonly connectionhandle_on_close: (a: number, b: number) => void;
  readonly connectionhandle_get_remote_member_id: (a: number, b: number) => void;
  readonly connectionhandle_on_remote_track_added: (a: number, b: number) => void;
  readonly connectionhandle_on_quality_score_update: (a: number, b: number) => void;
  readonly __wbg_roomclosereason_free: (a: number) => void;
  readonly roomclosereason_reason: (a: number, b: number) => void;
  readonly roomclosereason_is_closed_by_server: (a: number) => number;
  readonly roomclosereason_is_err: (a: number) => number;
  readonly __wbg_roomhandle_free: (a: number) => void;
  readonly roomhandle_on_new_connection: (a: number, b: number) => void;
  readonly roomhandle_on_close: (a: number, b: number) => void;
  readonly roomhandle_on_local_track: (a: number, b: number) => void;
  readonly roomhandle_on_failed_local_media: (a: number, b: number) => void;
  readonly roomhandle_on_connection_loss: (a: number, b: number) => void;
  readonly roomhandle_join: (a: number, b: number, c: number) => number;
  readonly roomhandle_set_local_media_settings: (a: number, b: number) => number;
  readonly roomhandle_disable_audio: (a: number) => number;
  readonly roomhandle_enable_audio: (a: number) => number;
  readonly roomhandle_disable_video: (a: number, b: number) => number;
  readonly roomhandle_enable_video: (a: number, b: number) => number;
  readonly roomhandle_disable_remote_audio: (a: number) => number;
  readonly roomhandle_disable_remote_video: (a: number) => number;
  readonly roomhandle_enable_remote_audio: (a: number) => number;
  readonly roomhandle_enable_remote_video: (a: number) => number;
  readonly __wbg_inputdeviceinfo_free: (a: number) => void;
  readonly inputdeviceinfo_device_id: (a: number, b: number) => void;
  readonly inputdeviceinfo_kind: (a: number) => number;
  readonly inputdeviceinfo_label: (a: number, b: number) => void;
  readonly inputdeviceinfo_group_id: (a: number, b: number) => void;
  readonly __wbg_mediatrack_free: (a: number) => void;
  readonly mediatrack_get_track: (a: number) => number;
  readonly mediatrack_enabled: (a: number) => number;
  readonly mediatrack_on_enabled: (a: number, b: number) => void;
  readonly mediatrack_on_disabled: (a: number, b: number) => void;
  readonly mediatrack_kind: (a: number) => number;
  readonly mediatrack_media_source_kind: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0a857573d7753aea: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h843fc22b67860888: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h63fe55e826c0e68b: (a: number, b: number, c: number, d: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
        