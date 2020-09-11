import { get_display_media } from './snippets/medea-jason-72b725b55e602e66/inline0.js';

let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_30(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h324fc44bad70d751(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_33(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h324fc44bad70d751(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_36(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h324fc44bad70d751(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_39(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h324fc44bad70d751(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_42(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h324fc44bad70d751(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_45(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h21ba75bfea0b3254(arg0, arg1, addHeapObject(arg2));
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
function __wbg_adapter_276(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h3ab66e0c34276d1e(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* Describes the directions that the camera can face, as seen from the user's
* perspective. Representation of [VideoFacingModeEnum][1].
*
* [1]: https://www.w3.org/TR/mediacapture-streams/#dom-videofacingmodeenum
*/
export const FacingMode = Object.freeze({
/**
* The source is facing toward the user (a self-view camera).
*/
User:0,"0":"User",
/**
* The source is facing away from the user (viewing the environment).
*/
Environment:1,"1":"Environment",
/**
* The source is facing to the left of the user.
*/
Left:2,"2":"Left",
/**
* The source is facing to the right of the user.
*/
Right:3,"3":"Right", });
/**
* Constraints applicable to audio tracks.
*/
export class AudioTrackConstraints {

    static __wrap(ptr) {
        const obj = Object.create(AudioTrackConstraints.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_audiotrackconstraints_free(ptr);
    }
    /**
    * Creates new [`AudioTrackConstraints`] with none constraints configured.
    */
    constructor() {
        var ret = wasm.audiotrackconstraints_new();
        return AudioTrackConstraints.__wrap(ret);
    }
    /**
    * Sets exact [deviceId][1] constraint.
    *
    * [1]: https://w3.org/TR/mediacapture-streams/#def-constraint-deviceId
    * @param {string} device_id
    */
    device_id(device_id) {
        var ptr0 = passStringToWasm0(device_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.audiotrackconstraints_device_id(this.ptr, ptr0, len0);
    }
}
/**
* Connection with a specific remote `Member`, that is used on JS side.
*
* Actually, represents a [`Weak`]-based handle to `InnerConnection`.
*/
export class ConnectionHandle {

    static __wrap(ptr) {
        const obj = Object.create(ConnectionHandle.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_connectionhandle_free(ptr);
    }
    /**
    * Sets callback, which will be invoked as soon as first media track from
    * remote `Member` is received.
    *
    * It's guaranteed that provided stream will have at least one media track
    * when this callback is fired. List of tracks in provided stream is not
    * final and can be changed in future.
    * @param {Function} f
    */
    on_remote_stream(f) {
        wasm.connectionhandle_on_remote_stream(this.ptr, addHeapObject(f));
    }
    /**
    * Sets callback, which will be invoked when this `Connection` will close.
    * @param {Function} f
    */
    on_close(f) {
        wasm.connectionhandle_on_close(this.ptr, addHeapObject(f));
    }
    /**
    * Returns remote `Member` ID.
    * @returns {string}
    */
    get_remote_member_id() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.connectionhandle_get_remote_member_id(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Sets callback, which will be invoked when connection quality score will
    * be updated by server.
    * @param {Function} f
    */
    on_quality_score_update(f) {
        wasm.connectionhandle_on_quality_score_update(this.ptr, addHeapObject(f));
    }
}
/**
* Constraints applicable to video tracks that are sourced from some media
* device.
*/
export class DeviceVideoTrackConstraints {

    static __wrap(ptr) {
        const obj = Object.create(DeviceVideoTrackConstraints.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_devicevideotrackconstraints_free(ptr);
    }
    /**
    * Creates new [`DeviceVideoTrackConstraints`] with none constraints
    * configured.
    */
    constructor() {
        var ret = wasm.devicevideotrackconstraints_new();
        return DeviceVideoTrackConstraints.__wrap(ret);
    }
    /**
    * Sets exact [deviceId][1] constraint.
    *
    * [1]: https://w3.org/TR/mediacapture-streams/#def-constraint-deviceId
    * @param {string} device_id
    */
    device_id(device_id) {
        var ptr0 = passStringToWasm0(device_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.audiotrackconstraints_device_id(this.ptr, ptr0, len0);
    }
    /**
    * Sets exact [facingMode][1] constraint.
    *
    * [1]: https://tinyurl.com/y2ks2mjj
    * @param {number} facing_mode
    */
    exact_facing_mode(facing_mode) {
        wasm.devicevideotrackconstraints_exact_facing_mode(this.ptr, facing_mode);
    }
    /**
    * Sets ideal [facingMode][1] constraint.
    *
    * [1]: https://tinyurl.com/y2ks2mjj
    * @param {number} facing_mode
    */
    ideal_facing_mode(facing_mode) {
        wasm.devicevideotrackconstraints_ideal_facing_mode(this.ptr, facing_mode);
    }
}
/**
* Constraints applicable to video tracks sourced from screen capture.
*/
export class DisplayVideoTrackConstraints {

    static __wrap(ptr) {
        const obj = Object.create(DisplayVideoTrackConstraints.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_displayvideotrackconstraints_free(ptr);
    }
    /**
    * Creates new [`DisplayVideoTrackConstraints`] with none constraints
    * configured.
    */
    constructor() {
        var ret = wasm.displayvideotrackconstraints_new();
        return DisplayVideoTrackConstraints.__wrap(ret);
    }
}
/**
* Representation of [MediaDeviceInfo][1].
*
* [1]: https://w3.org/TR/mediacapture-streams/#device-info
*/
export class InputDeviceInfo {

    static __wrap(ptr) {
        const obj = Object.create(InputDeviceInfo.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_inputdeviceinfo_free(ptr);
    }
    /**
    * Returns unique identifier for the represented device.
    * @returns {string}
    */
    device_id() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.inputdeviceinfo_device_id(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Returns kind of the represented device.
    *
    * This representation of [MediaDeviceInfo][1] ONLY for input device.
    *
    * [1]: https://w3.org/TR/mediacapture-streams/#device-info
    * @returns {string}
    */
    kind() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.inputdeviceinfo_kind(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Returns label describing the represented device (for example
    * "External USB Webcam").
    * If the device has no associated label, then returns an empty string.
    * @returns {string}
    */
    label() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.inputdeviceinfo_label(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
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
    group_id() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.inputdeviceinfo_group_id(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
/**
* General library interface.
*
* Responsible for managing shared transports, local media
* and room initialization.
*/
export class Jason {

    static __wrap(ptr) {
        const obj = Object.create(Jason.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_jason_free(ptr);
    }
    /**
    * Instantiates new [`Jason`] interface to interact with this library.
    */
    constructor() {
        var ret = wasm.jason_new();
        return Jason.__wrap(ret);
    }
    /**
    * Returns [`RoomHandle`] for [`Room`].
    * @returns {RoomHandle}
    */
    init_room() {
        var ret = wasm.jason_init_room(this.ptr);
        return RoomHandle.__wrap(ret);
    }
    /**
    * Returns handle to [`MediaManager`].
    * @returns {MediaManagerHandle}
    */
    media_manager() {
        var ret = wasm.jason_media_manager(this.ptr);
        return MediaManagerHandle.__wrap(ret);
    }
    /**
    * Drops [`Jason`] API object, so all related objects (rooms, connections,
    * streams etc.) respectively. All objects related to this [`Jason`] API
    * object will be detached (you will still hold them, but unable to use).
    */
    dispose() {
        var ptr = this.ptr;
        this.ptr = 0;
        wasm.jason_dispose(ptr);
    }
}
/**
* Representation of app error exported to JS side.
*
* Contains JS side error if it the cause and trace information.
*/
export class JasonError {

    static __wrap(ptr) {
        const obj = Object.create(JasonError.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_jasonerror_free(ptr);
    }
    /**
    * Returns name of error.
    * @returns {string}
    */
    name() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.jasonerror_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Returns message of errors.
    * @returns {string}
    */
    message() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.jasonerror_message(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Returns trace information of error.
    * @returns {string}
    */
    trace() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.jasonerror_trace(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Returns JS side error if it the cause.
    * @returns {Error | undefined}
    */
    source() {
        var ret = wasm.jasonerror_source(this.ptr);
        return takeObject(ret);
    }
}
/**
* Representation of [MediaStream][1] object. Contains strong references to
* [`MediaStreamTrack`].
*
* [1]: https://w3.org/TR/mediacapture-streams/#mediastream
*/
export class LocalMediaStream {

    static __wrap(ptr) {
        const obj = Object.create(LocalMediaStream.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_localmediastream_free(ptr);
    }
    /**
    * Returns underlying [MediaStream][1].
    *
    * [1]: https://w3.org/TR/mediacapture-streams/#mediastream
    * @returns {MediaStream}
    */
    get_media_stream() {
        var ret = wasm.localmediastream_get_media_stream(this.ptr);
        return takeObject(ret);
    }
    /**
    * Drops all audio tracks contained in ths stream.
    */
    free_audio() {
        wasm.localmediastream_free_audio(this.ptr);
    }
    /**
    * Drops all video tracks contained in ths stream.
    */
    free_video() {
        wasm.localmediastream_free_video(this.ptr);
    }
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

    static __wrap(ptr) {
        const obj = Object.create(MediaManagerHandle.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mediamanagerhandle_free(ptr);
    }
    /**
    * Returns array of [`InputDeviceInfo`] objects, which represent available
    * media input and output devices, such as microphones, cameras, and so
    * forth.
    * @returns {Promise<any>}
    */
    enumerate_devices() {
        var ret = wasm.mediamanagerhandle_enumerate_devices(this.ptr);
        return takeObject(ret);
    }
    /**
    * Returns [`MediaStream`](LocalMediaStream) object, built from provided
    * [`MediaStreamSettings`].
    * @param {MediaStreamSettings} caps
    * @returns {Promise<any>}
    */
    init_local_stream(caps) {
        _assertClass(caps, MediaStreamSettings);
        var ret = wasm.mediamanagerhandle_init_local_stream(this.ptr, caps.ptr);
        return takeObject(ret);
    }
}
/**
* [MediaStreamConstraints][1] wrapper.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediastreamconstraints
*/
export class MediaStreamSettings {

    static __wrap(ptr) {
        const obj = Object.create(MediaStreamSettings.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mediastreamsettings_free(ptr);
    }
    /**
    * Creates new [`MediaStreamConstraints`] with none constraints configured.
    */
    constructor() {
        var ret = wasm.mediastreamsettings_new();
        return MediaStreamSettings.__wrap(ret);
    }
    /**
    * Specifies the nature and settings of the audio [MediaStreamTrack][1].
    *
    * [1]: https://w3.org/TR/mediacapture-streams/#mediastreamtrack
    * @param {AudioTrackConstraints} constraints
    */
    audio(constraints) {
        _assertClass(constraints, AudioTrackConstraints);
        var ptr0 = constraints.ptr;
        constraints.ptr = 0;
        wasm.mediastreamsettings_audio(this.ptr, ptr0);
    }
    /**
    * Set constraints that will be used to obtain local video sourced from
    * media device.
    * @param {DeviceVideoTrackConstraints} constraints
    */
    device_video(constraints) {
        _assertClass(constraints, DeviceVideoTrackConstraints);
        var ptr0 = constraints.ptr;
        constraints.ptr = 0;
        wasm.mediastreamsettings_device_video(this.ptr, ptr0);
    }
    /**
    * Set constraints that will be used to capture local video from user
    * display.
    * @param {DisplayVideoTrackConstraints} constraints
    */
    display_video(constraints) {
        _assertClass(constraints, DisplayVideoTrackConstraints);
        var ptr0 = constraints.ptr;
        constraints.ptr = 0;
        wasm.mediastreamsettings_display_video(this.ptr, ptr0);
    }
}
/**
* Handle that JS side can reconnect to the Medea media server on
* a connection loss with.
*
* This handle will be provided into `Room.on_connection_loss` callback.
*/
export class ReconnectHandle {

    static __wrap(ptr) {
        const obj = Object.create(ReconnectHandle.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_reconnecthandle_free(ptr);
    }
    /**
    * Tries to reconnect after the provided delay in milliseconds.
    *
    * If [`RpcClient`] is already reconnecting then new reconnection attempt
    * won't be performed. Instead, it will wait for the first reconnection
    * attempt result and use it here.
    * @param {number} delay_ms
    * @returns {Promise<any>}
    */
    reconnect_with_delay(delay_ms) {
        var ret = wasm.reconnecthandle_reconnect_with_delay(this.ptr, delay_ms);
        return takeObject(ret);
    }
    /**
    * Tries to reconnect [`RpcClient`] in a loop with a growing backoff delay.
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
    * If [`RpcClient`] is already reconnecting then new reconnection attempt
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
    reconnect_with_backoff(starting_delay_ms, multiplier, max_delay) {
        var ret = wasm.reconnecthandle_reconnect_with_backoff(this.ptr, starting_delay_ms, multiplier, max_delay);
        return takeObject(ret);
    }
}
/**
* JS side handle to [`PeerMediaStream`].
*
* Actually, represents a [`Weak`]-based handle to `InnerStream`.
*
* For using [`RemoteMediaStream`] on Rust side, consider the
* [`PeerMediaStream`].
*/
export class RemoteMediaStream {

    static __wrap(ptr) {
        const obj = Object.create(RemoteMediaStream.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_remotemediastream_free(ptr);
    }
    /**
    * Returns the underlying [`PeerMediaStream`][`SysMediaStream`] object.
    * @returns {MediaStream}
    */
    get_media_stream() {
        var ret = wasm.remotemediastream_get_media_stream(this.ptr);
        return takeObject(ret);
    }
    /**
    * Indicates whether at least one video [`MediaStreamTrack`] exists in this
    * [`RemoteMediaStream`].
    * @returns {boolean}
    */
    has_active_audio() {
        var ret = wasm.remotemediastream_has_active_audio(this.ptr);
        return ret !== 0;
    }
    /**
    * Indicates whether at least one video [`MediaStreamTrack`] exists in this
    * [`RemoteMediaStream`].
    * @returns {boolean}
    */
    has_active_video() {
        var ret = wasm.remotemediastream_has_active_video(this.ptr);
        return ret !== 0;
    }
    /**
    * Sets the `callback` being invoked when new [`MediaStreamTrack`] is
    * added.
    * @param {Function} callback
    */
    on_track_added(callback) {
        wasm.remotemediastream_on_track_added(this.ptr, addHeapObject(callback));
    }
    /**
    * Sets the `callback` being invoked when [`MediaStreamTrack`] is enabled.
    * @param {Function} callback
    */
    on_track_enabled(callback) {
        wasm.remotemediastream_on_track_enabled(this.ptr, addHeapObject(callback));
    }
    /**
    * Sets the `callback` being invoked when [`MediaStreamTrack`] is disabled.
    * @param {Function} callback
    */
    on_track_disabled(callback) {
        wasm.remotemediastream_on_track_disabled(this.ptr, addHeapObject(callback));
    }
}
/**
* Reason of why [`Room`] has been closed.
*
* This struct is passed into `on_close_by_server` JS side callback.
*/
export class RoomCloseReason {

    static __wrap(ptr) {
        const obj = Object.create(RoomCloseReason.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_roomclosereason_free(ptr);
    }
    /**
    * `wasm_bindgen` getter for [`RoomCloseReason::reason`] field.
    * @returns {string}
    */
    reason() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.roomclosereason_reason(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * `wasm_bindgen` getter for [`RoomCloseReason::is_closed_by_server`]
    * field.
    * @returns {boolean}
    */
    is_closed_by_server() {
        var ret = wasm.roomclosereason_is_closed_by_server(this.ptr);
        return ret !== 0;
    }
    /**
    * `wasm_bindgen` getter for [`RoomCloseReason::is_err`] field.
    * @returns {boolean}
    */
    is_err() {
        var ret = wasm.roomclosereason_is_err(this.ptr);
        return ret !== 0;
    }
}
/**
* JS side handle to `Room` where all the media happens.
*
* Actually, represents a [`Weak`]-based handle to `InnerRoom`.
*
* For using [`RoomHandle`] on Rust side, consider the `Room`.
*/
export class RoomHandle {

    static __wrap(ptr) {
        const obj = Object.create(RoomHandle.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_roomhandle_free(ptr);
    }
    /**
    * Sets callback, which will be invoked when new [`Connection`] with some
    * remote `Peer` is established.
    * @param {Function} f
    */
    on_new_connection(f) {
        wasm.roomhandle_on_new_connection(this.ptr, addHeapObject(f));
    }
    /**
    * Sets `on_close` callback, which will be invoked on [`Room`] close,
    * providing [`RoomCloseReason`].
    * @param {Function} f
    */
    on_close(f) {
        wasm.roomhandle_on_close(this.ptr, addHeapObject(f));
    }
    /**
    * Sets `on_local_stream` callback. This callback is invoked each time
    * media acquisition request will resolve successfully. This might
    * happen in such cases:
    * 1. Media server initiates media request.
    * 2. `unmute_audio`/`unmute_video` is called.
    * 3. [`MediaStreamSettings`] updated via `set_local_media_settings`.
    * @param {Function} f
    */
    on_local_stream(f) {
        wasm.roomhandle_on_local_stream(this.ptr, addHeapObject(f));
    }
    /**
    * Sets `on_failed_local_stream` callback, which will be invoked on local
    * media acquisition failures.
    * @param {Function} f
    */
    on_failed_local_stream(f) {
        wasm.roomhandle_on_failed_local_stream(this.ptr, addHeapObject(f));
    }
    /**
    * Sets `on_connection_loss` callback, which will be invoked on
    * [`RpcClient`] connection loss.
    * @param {Function} f
    */
    on_connection_loss(f) {
        wasm.roomhandle_on_connection_loss(this.ptr, addHeapObject(f));
    }
    /**
    * Performs entering to a [`Room`] with the preconfigured authorization
    * `token` for connection with media server.
    *
    * Establishes connection with media server (if it doesn't already exist).
    * Fails if:
    *   - `on_failed_local_stream` callback is not set
    *   - `on_connection_loss` callback is not set
    *   - unable to connect to media server.
    *
    * Effectively returns `Result<(), JasonError>`.
    * @param {string} token
    * @returns {Promise<any>}
    */
    join(token) {
        var ptr0 = passStringToWasm0(token, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.roomhandle_join(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * Updates this [`Room`]s [`MediaStreamSettings`]. This affects all
    * [`PeerConnection`]s in this [`Room`]. If [`MediaStreamSettings`] is
    * configured for some [`Room`], then this [`Room`] can only send
    * [`MediaStream`] that corresponds to this settings.
    * [`MediaStreamSettings`] update will change [`MediaStream`] in all
    * sending peers, so that might cause new [getUserMedia()][1] request.
    *
    * Media obtaining/injection errors are fired to `on_failed_local_stream`
    * callback.
    *
    * [`PeerConnection`]: crate::peer::PeerConnection
    * [1]: https://tinyurl.com/rnxcavf
    * @param {MediaStreamSettings} settings
    * @returns {Promise<any>}
    */
    set_local_media_settings(settings) {
        _assertClass(settings, MediaStreamSettings);
        var ret = wasm.roomhandle_set_local_media_settings(this.ptr, settings.ptr);
        return takeObject(ret);
    }
    /**
    * Mutes outbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    mute_audio() {
        var ret = wasm.roomhandle_mute_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Unmutes outbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    unmute_audio() {
        var ret = wasm.roomhandle_unmute_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Mutes outbound video in this [`Room`].
    * @returns {Promise<any>}
    */
    mute_video() {
        var ret = wasm.roomhandle_mute_video(this.ptr);
        return takeObject(ret);
    }
    /**
    * Unmutes outbound video in this [`Room`].
    * @returns {Promise<any>}
    */
    unmute_video() {
        var ret = wasm.roomhandle_unmute_video(this.ptr);
        return takeObject(ret);
    }
    /**
    * Mutes inbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    mute_remote_audio() {
        var ret = wasm.roomhandle_mute_remote_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Unmutes inbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    unmute_remote_audio() {
        var ret = wasm.roomhandle_unmute_remote_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Mutes inbound video in this [`Room`].
    * @returns {Promise<any>}
    */
    mute_remote_video() {
        var ret = wasm.roomhandle_mute_remote_video(this.ptr);
        return takeObject(ret);
    }
    /**
    * Unmutes inbound video in this [`Room`].
    * @returns {Promise<any>}
    */
    unmute_remote_video() {
        var ret = wasm.roomhandle_unmute_remote_video(this.ptr);
        return takeObject(ret);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        var ret = false;
        return ret;
    };
    imports.wbg.__wbg_jasonerror_new = function(arg0) {
        var ret = JasonError.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getdisplaymedia_da88b7d1f14357f5 = handleError(function(arg0, arg1) {
        var ret = get_display_media(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_inputdeviceinfo_new = function(arg0) {
        var ret = InputDeviceInfo.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_localmediastream_new = function(arg0) {
        var ret = LocalMediaStream.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        var ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_remotemediastream_new = function(arg0) {
        var ret = RemoteMediaStream.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_connectionhandle_new = function(arg0) {
        var ret = ConnectionHandle.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_reconnecthandle_new = function(arg0) {
        var ret = ReconnectHandle.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_roomclosereason_new = function(arg0) {
        var ret = RoomCloseReason.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = JSON.stringify(obj === undefined ? null : obj);
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbg_instanceof_Window_adf3196bdc02b386 = function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_navigator_71c234326c0a2ebb = function(arg0) {
        var ret = getObject(arg0).navigator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setTimeout_eaf00c9296a6ab88 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
    });
    imports.wbg.__wbg_debug_d101e002eb92f20b = function(arg0, arg1, arg2, arg3) {
        console.debug(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_error_7f083efc6bc6752c = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_error_cb872335132b1ef7 = function(arg0, arg1, arg2, arg3) {
        console.error(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_info_a25afde0ff8cd04a = function(arg0, arg1, arg2, arg3) {
        console.info(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_log_64f566ae90a6c43c = function(arg0, arg1, arg2, arg3) {
        console.log(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_warn_f632d7d3f55682b6 = function(arg0, arg1, arg2, arg3) {
        console.warn(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_data_5202563349cacee4 = function(arg0) {
        var ret = getObject(arg0).data;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_track_9892f71ad211c93c = function(arg0) {
        var ret = getObject(arg0).track;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_transceiver_cc8646d7034aa225 = function(arg0) {
        var ret = getObject(arg0).transceiver;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_candidate_73417ddd4cecaa14 = function(arg0) {
        var ret = getObject(arg0).candidate;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_candidate_fbdfa9c0d9d6a6d1 = function(arg0, arg1) {
        var ret = getObject(arg1).candidate;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sdpMid_521315223542f7e8 = function(arg0, arg1) {
        var ret = getObject(arg1).sdpMid;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sdpMLineIndex_75dced3ab392eac4 = function(arg0) {
        var ret = getObject(arg0).sdpMLineIndex;
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    };
    imports.wbg.__wbg_sdp_4f276ddda204cd9a = function(arg0, arg1) {
        var ret = getObject(arg1).sdp;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_kind_eb7db7cdc7e4d77e = function(arg0, arg1) {
        var ret = getObject(arg1).kind;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_id_c3539ab254100a97 = function(arg0, arg1) {
        var ret = getObject(arg1).id;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_enabled_7e8b911257f638fd = function(arg0) {
        var ret = getObject(arg0).enabled;
        return ret;
    };
    imports.wbg.__wbg_setenabled_22d3316a119440dc = function(arg0, arg1) {
        getObject(arg0).enabled = arg1 !== 0;
    };
    imports.wbg.__wbg_readyState_2dab8ba324864c07 = function(arg0) {
        var ret = getObject(arg0).readyState;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getSettings_a971a5676878f1bf = function(arg0) {
        var ret = getObject(arg0).getSettings();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stop_d444d84b9b67f10e = function(arg0) {
        getObject(arg0).stop();
    };
    imports.wbg.__wbg_mid_71472f383726ebf2 = function(arg0, arg1) {
        var ret = getObject(arg1).mid;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sender_c22669491547456e = function(arg0) {
        var ret = getObject(arg0).sender;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setdirection_8fb51fb1721865f4 = function(arg0, arg1) {
        getObject(arg0).direction = takeObject(arg1);
    };
    imports.wbg.__wbg_iceConnectionState_e63ebb4eb2b3c00d = function(arg0) {
        var ret = getObject(arg0).iceConnectionState;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithconfiguration_56d2d4eb5cf752cf = handleError(function(arg0) {
        var ret = new RTCPeerConnection(getObject(arg0));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_addIceCandidate_ff5a3ef5bdd046cd = function(arg0, arg1) {
        var ret = getObject(arg0).addIceCandidate(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addTransceiver_43f53033592b46eb = function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).addTransceiver(getStringFromWasm0(arg1, arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_close_34975aa6a87720d1 = function(arg0) {
        getObject(arg0).close();
    };
    imports.wbg.__wbg_createAnswer_859ae6e8ec595dc0 = function(arg0) {
        var ret = getObject(arg0).createAnswer();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_createOffer_d6a7e6d58c6d218c = function(arg0) {
        var ret = getObject(arg0).createOffer();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getStats_09c30c057abdcdcc = function(arg0) {
        var ret = getObject(arg0).getStats();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getTransceivers_753aec3452e6557b = function(arg0) {
        var ret = getObject(arg0).getTransceivers();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setLocalDescription_8e33fc02cc1dae79 = function(arg0, arg1) {
        var ret = getObject(arg0).setLocalDescription(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setRemoteDescription_f7ac16655c13cd27 = function(arg0, arg1) {
        var ret = getObject(arg0).setRemoteDescription(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_mediaDevices_fd0bd76dc4a5a255 = handleError(function(arg0) {
        var ret = getObject(arg0).mediaDevices;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_77a54c9ff9182069 = handleError(function() {
        var ret = new MediaStream();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_addTrack_9876f28117af4ecd = function(arg0, arg1) {
        getObject(arg0).addTrack(getObject(arg1));
    };
    imports.wbg.__wbg_getTracks_ceaa6e96f5353c87 = function(arg0) {
        var ret = getObject(arg0).getTracks();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addEventListener_9e7b0c3f65ebc0d7 = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_removeEventListener_e118aefce350c930 = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_enumerateDevices_42805cc51a7e667d = handleError(function(arg0) {
        var ret = getObject(arg0).enumerateDevices();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_getUserMedia_29ee69dc28a278d2 = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).getUserMedia(getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_47519bef8e7b1faa = handleError(function(arg0, arg1) {
        var ret = new WebSocket(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_close_eca64aef3e38a433 = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).close(arg1, getStringFromWasm0(arg2, arg3));
    });
    imports.wbg.__wbg_send_ffae55581a501355 = handleError(function(arg0, arg1, arg2) {
        getObject(arg0).send(getStringFromWasm0(arg1, arg2));
    });
    imports.wbg.__wbg_deviceId_eebc946f70cd5344 = function(arg0, arg1) {
        var ret = getObject(arg1).deviceId;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_kind_7a4972d65feb738a = function(arg0) {
        var ret = getObject(arg0).kind;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_label_4a54962e6760d121 = function(arg0, arg1) {
        var ret = getObject(arg1).label;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_groupId_794541855389dc3b = function(arg0, arg1) {
        var ret = getObject(arg1).groupId;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_code_59278c1672536fbe = function(arg0) {
        var ret = getObject(arg0).code;
        return ret;
    };
    imports.wbg.__wbg_reason_343f0883b42e3530 = function(arg0, arg1) {
        var ret = getObject(arg1).reason;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_replaceTrack_8b13cde4bb5185e6 = function(arg0, arg1) {
        var ret = getObject(arg0).replaceTrack(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_27693110cb44e852 = function(arg0, arg1) {
        var ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        var ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        var ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_next_edda7e0003e5daf9 = function(arg0) {
        var ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_2966fa909601a075 = handleError(function(arg0) {
        var ret = getObject(arg0).next();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_done_037d0a173aef1834 = function(arg0) {
        var ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_e60bbfb7d52af62f = function(arg0) {
        var ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_09191f8878ea9877 = function() {
        var ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_0e3f2950cdf758ae = handleError(function(arg0, arg1) {
        var ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_call_8e95613cc6524977 = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_e13110f81ae347cf = function() {
        var ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_from_2a5d647e62275bfd = function(arg0) {
        var ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_b46eeec52d2b03bb = function(arg0, arg1) {
        var ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_values_a8e8f7b69d5eb117 = function(arg0) {
        var ret = getObject(arg0).values();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Error_0b25dc8788d02c64 = function(arg0) {
        var ret = getObject(arg0) instanceof Error;
        return ret;
    };
    imports.wbg.__wbg_new_1192d65414040ad9 = function(arg0, arg1) {
        var ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_message_648d5860715944a3 = function(arg0) {
        var ret = getObject(arg0).message;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_name_a08ace2acd4dd302 = function(arg0) {
        var ret = getObject(arg0).name;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setname_a2f5f3bdfc971d1d = function(arg0, arg1, arg2) {
        getObject(arg0).name = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_newnoargs_f3b8a801d5d4b079 = function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_d713ea0274dfc6d2 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_3e06d4f36713e4cb = function() {
        var ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_d0c63652ab4d825c = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_276(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            var ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_resolve_2529512c3bb73938 = function(arg0) {
        var ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_4a7a614abbbe6d81 = function(arg0, arg1) {
        var ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_3b7ac098cfda2fa5 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_07b2f89e82ceb76d = handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_window_ba85d88572adc0dc = handleError(function() {
        var ret = window.window;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_globalThis_b9277fc37e201fe5 = handleError(function() {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_global_e16303fe83e1d57f = handleError(function() {
        var ret = global.global;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_set_304f2ec1a3ab3b79 = handleError(function(arg0, arg1, arg2) {
        var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    });
    imports.wbg.__wbindgen_is_string = function(arg0) {
        var ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_closure_wrapper1012 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 250, __wbg_adapter_30);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1013 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 250, __wbg_adapter_33);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1014 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 250, __wbg_adapter_36);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1017 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 250, __wbg_adapter_39);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1020 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 250, __wbg_adapter_42);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1585 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 446, __wbg_adapter_45);
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

