/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_mediatrack_free(a: number): void;
export function mediatrack_get_track(a: number): number;
export function mediatrack_enabled(a: number): number;
export function mediatrack_on_enabled(a: number, b: number): void;
export function mediatrack_on_disabled(a: number, b: number): void;
export function mediatrack_kind(a: number, b: number): void;
export function __wbg_mediamanagerhandle_free(a: number): void;
export function mediamanagerhandle_enumerate_devices(a: number): number;
export function mediamanagerhandle_init_local_tracks(a: number, b: number): number;
export function __wbg_jason_free(a: number): void;
export function jason_new(): number;
export function jason_init_room(a: number): number;
export function jason_media_manager(a: number): number;
export function jason_dispose(a: number): void;
export function __wbg_mediastreamsettings_free(a: number): void;
export function mediastreamsettings_new(): number;
export function mediastreamsettings_audio(a: number, b: number): void;
export function mediastreamsettings_device_video(a: number, b: number): void;
export function mediastreamsettings_display_video(a: number, b: number): void;
export function __wbg_audiotrackconstraints_free(a: number): void;
export function audiotrackconstraints_new(): number;
export function audiotrackconstraints_device_id(a: number, b: number, c: number): void;
export function devicevideotrackconstraints_new(): number;
export function devicevideotrackconstraints_exact_facing_mode(a: number, b: number): void;
export function devicevideotrackconstraints_ideal_facing_mode(a: number, b: number): void;
export function __wbg_displayvideotrackconstraints_free(a: number): void;
export function displayvideotrackconstraints_new(): number;
export function __wbg_devicevideotrackconstraints_free(a: number): void;
export function devicevideotrackconstraints_device_id(a: number, b: number, c: number): void;
export function __wbg_connectionhandle_free(a: number): void;
export function connectionhandle_on_close(a: number, b: number): void;
export function connectionhandle_get_remote_member_id(a: number, b: number): void;
export function connectionhandle_on_remote_track_added(a: number, b: number): void;
export function connectionhandle_on_quality_score_update(a: number, b: number): void;
export function __wbg_roomclosereason_free(a: number): void;
export function roomclosereason_reason(a: number, b: number): void;
export function roomclosereason_is_closed_by_server(a: number): number;
export function roomclosereason_is_err(a: number): number;
export function __wbg_roomhandle_free(a: number): void;
export function roomhandle_on_new_connection(a: number, b: number): void;
export function roomhandle_on_close(a: number, b: number): void;
export function roomhandle_on_local_track(a: number, b: number): void;
export function roomhandle_on_failed_local_media(a: number, b: number): void;
export function roomhandle_on_connection_loss(a: number, b: number): void;
export function roomhandle_join(a: number, b: number, c: number): number;
export function roomhandle_set_local_media_settings(a: number, b: number): number;
export function roomhandle_mute_audio(a: number): number;
export function roomhandle_unmute_audio(a: number): number;
export function roomhandle_mute_video(a: number): number;
export function roomhandle_unmute_video(a: number): number;
export function roomhandle_mute_remote_audio(a: number): number;
export function roomhandle_mute_remote_video(a: number): number;
export function roomhandle_unmute_remote_audio(a: number): number;
export function roomhandle_unmute_remote_video(a: number): number;
export function __wbg_inputdeviceinfo_free(a: number): void;
export function inputdeviceinfo_device_id(a: number, b: number): void;
export function inputdeviceinfo_kind(a: number, b: number): void;
export function inputdeviceinfo_label(a: number, b: number): void;
export function inputdeviceinfo_group_id(a: number, b: number): void;
export function __wbg_reconnecthandle_free(a: number): void;
export function reconnecthandle_reconnect_with_delay(a: number, b: number): number;
export function reconnecthandle_reconnect_with_backoff(a: number, b: number, c: number, d: number): number;
export function __wbg_jasonerror_free(a: number): void;
export function jasonerror_name(a: number, b: number): void;
export function jasonerror_message(a: number, b: number): void;
export function jasonerror_trace(a: number, b: number): void;
export function jasonerror_source(a: number): number;
export function __wbindgen_malloc(a: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h2839eccfc6bc978c(a: number, b: number, c: number): void;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb32110d5e4a698d4(a: number, b: number, c: number): void;
export function __wbindgen_free(a: number, b: number): void;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__hbecdc807be7d3301(a: number, b: number, c: number, d: number): void;
