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

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
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
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h06fdec0b06cb33d5(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_33(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5cd511c2e68c60f4(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_36(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h06fdec0b06cb33d5(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_39(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h06fdec0b06cb33d5(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_42(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h06fdec0b06cb33d5(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_45(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h06fdec0b06cb33d5(arg0, arg1, addHeapObject(arg2));
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
function __wbg_adapter_260(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h84c00bbcf15db58e(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

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
    * Sets [deviceId][1] constraint.
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
        var ret = wasm.audiotrackconstraints_new();
        return DeviceVideoTrackConstraints.__wrap(ret);
    }
    /**
    * Sets [deviceId][1] constraint.
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
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_jasonerror_new = function(arg0) {
        var ret = JasonError.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        var ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_connectionhandle_new = function(arg0) {
        var ret = ConnectionHandle.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_remotemediastream_new = function(arg0) {
        var ret = RemoteMediaStream.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getdisplaymedia_da88b7d1f14357f5 = handleError(function(arg0, arg1) {
        var ret = get_display_media(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_localmediastream_new = function(arg0) {
        var ret = LocalMediaStream.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_inputdeviceinfo_new = function(arg0) {
        var ret = InputDeviceInfo.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_roomclosereason_new = function(arg0) {
        var ret = RoomCloseReason.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_reconnecthandle_new = function(arg0) {
        var ret = ReconnectHandle.__wrap(arg0);
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
    imports.wbg.__wbg_instanceof_Window_e8f84259147dce74 = function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_navigator_06614ec1a7c6bb66 = function(arg0) {
        var ret = getObject(arg0).navigator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setTimeout_d0eb4368d101bd72 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
    });
    imports.wbg.__wbg_error_7dcc755846c00ef7 = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_data_6ea4600a7910f404 = function(arg0) {
        var ret = getObject(arg0).data;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_replaceTrack_9c2183fbfcc5cd70 = function(arg0, arg1) {
        var ret = getObject(arg0).replaceTrack(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_track_2996a1fed5f1988f = function(arg0) {
        var ret = getObject(arg0).track;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_transceiver_9c216b3158a63bf6 = function(arg0) {
        var ret = getObject(arg0).transceiver;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_candidate_b01a5c110991672f = function(arg0) {
        var ret = getObject(arg0).candidate;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_candidate_34fe863ec08f0bf4 = function(arg0, arg1) {
        var ret = getObject(arg1).candidate;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sdpMid_761270a4c4d07519 = function(arg0, arg1) {
        var ret = getObject(arg1).sdpMid;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sdpMLineIndex_30b7f6b695b8e554 = function(arg0) {
        var ret = getObject(arg0).sdpMLineIndex;
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    };
    imports.wbg.__wbg_mid_156e8e94ab0830cf = function(arg0, arg1) {
        var ret = getObject(arg1).mid;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sender_1c54e0dad6a6cac4 = function(arg0) {
        var ret = getObject(arg0).sender;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setdirection_bda725e2ab96df87 = function(arg0, arg1) {
        getObject(arg0).direction = takeObject(arg1);
    };
    imports.wbg.__wbg_kind_4e0c86cf60fa4fc7 = function(arg0, arg1) {
        var ret = getObject(arg1).kind;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_id_25c8e95f2f33bca0 = function(arg0, arg1) {
        var ret = getObject(arg1).id;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_enabled_c16f9ce7709b9b8f = function(arg0) {
        var ret = getObject(arg0).enabled;
        return ret;
    };
    imports.wbg.__wbg_setenabled_535aaf84f0dd0889 = function(arg0, arg1) {
        getObject(arg0).enabled = arg1 !== 0;
    };
    imports.wbg.__wbg_readyState_45cd7a21c1e5e494 = function(arg0) {
        var ret = getObject(arg0).readyState;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getSettings_a4d3617abce959c8 = function(arg0) {
        var ret = getObject(arg0).getSettings();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stop_dd248302b8f06143 = function(arg0) {
        getObject(arg0).stop();
    };
    imports.wbg.__wbg_sdp_95a85c5e0b6ab274 = function(arg0, arg1) {
        var ret = getObject(arg1).sdp;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_iceConnectionState_1fdd14cea0fd1702 = function(arg0) {
        var ret = getObject(arg0).iceConnectionState;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithconfiguration_3775ecc8665e8c1a = handleError(function(arg0) {
        var ret = new RTCPeerConnection(getObject(arg0));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_addIceCandidate_b9ce06a6bd355812 = function(arg0, arg1) {
        var ret = getObject(arg0).addIceCandidate(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addTransceiver_b13f4431d04d0cba = function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).addTransceiver(getStringFromWasm0(arg1, arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_close_6e0235c64432d964 = function(arg0) {
        getObject(arg0).close();
    };
    imports.wbg.__wbg_createAnswer_708635a035ba40ac = function(arg0) {
        var ret = getObject(arg0).createAnswer();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_createOffer_c78d73179584888c = function(arg0) {
        var ret = getObject(arg0).createOffer();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getStats_3e651a119979bbe9 = function(arg0) {
        var ret = getObject(arg0).getStats();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getTransceivers_437f26acc252a72b = function(arg0) {
        var ret = getObject(arg0).getTransceivers();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setLocalDescription_002d93d6396d1bf4 = function(arg0, arg1) {
        var ret = getObject(arg0).setLocalDescription(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setRemoteDescription_98ff53973c4e3c27 = function(arg0, arg1) {
        var ret = getObject(arg0).setRemoteDescription(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_mediaDevices_4d05e126ce5c7ada = handleError(function(arg0) {
        var ret = getObject(arg0).mediaDevices;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_enumerateDevices_2e9ccb9575844465 = handleError(function(arg0) {
        var ret = getObject(arg0).enumerateDevices();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_getUserMedia_27d07ae1c5d2c3ce = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).getUserMedia(getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_5fc2881ab0e287da = handleError(function() {
        var ret = new MediaStream();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_addTrack_0798448d21e72c4e = function(arg0, arg1) {
        getObject(arg0).addTrack(getObject(arg1));
    };
    imports.wbg.__wbg_getTracks_0a3aefc55b201cea = function(arg0) {
        var ret = getObject(arg0).getTracks();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addEventListener_116c561435e7160d = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_removeEventListener_d9ceb7fdf4ca5166 = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_new_42231c24f0da8a2c = handleError(function(arg0, arg1) {
        var ret = new WebSocket(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_close_c4d423d5e6332cb8 = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).close(arg1, getStringFromWasm0(arg2, arg3));
    });
    imports.wbg.__wbg_send_8f4631f5f266e0a1 = handleError(function(arg0, arg1, arg2) {
        getObject(arg0).send(getStringFromWasm0(arg1, arg2));
    });
    imports.wbg.__wbg_deviceId_08d64f6e6a512db1 = function(arg0, arg1) {
        var ret = getObject(arg1).deviceId;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_kind_ddfd632b6f79082f = function(arg0) {
        var ret = getObject(arg0).kind;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_label_2a7bb1474ac493a8 = function(arg0, arg1) {
        var ret = getObject(arg1).label;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_groupId_85d08240dc433566 = function(arg0, arg1) {
        var ret = getObject(arg1).groupId;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_code_04aabbe7d8c34a2e = function(arg0) {
        var ret = getObject(arg0).code;
        return ret;
    };
    imports.wbg.__wbg_reason_2d93590f9710d632 = function(arg0, arg1) {
        var ret = getObject(arg1).reason;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_get_9ca243f6a0c3698a = function(arg0, arg1) {
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
    imports.wbg.__wbg_next_ff567d625ac44e49 = function(arg0) {
        var ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_610093e8f95067a4 = handleError(function(arg0) {
        var ret = getObject(arg0).next();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_done_deb5f896b3ea14eb = function(arg0) {
        var ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_5b6409ce10298b82 = function(arg0) {
        var ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_fe2907a0b53cd987 = function() {
        var ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_2e96a823c1c5a5bd = handleError(function(arg0, arg1) {
        var ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_call_e9f0ce4da840ab94 = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_17534eac4df3cd22 = function() {
        var ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_from_c205b0d4f5dc1441 = function(arg0) {
        var ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_7114ccbf1c58e41f = function(arg0, arg1) {
        var ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_values_bfec0c6fe421158f = function(arg0) {
        var ret = getObject(arg0).values();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Error_e6c50eb74e5b1d2e = function(arg0) {
        var ret = getObject(arg0) instanceof Error;
        return ret;
    };
    imports.wbg.__wbg_new_4896ab6bba55e0d9 = function(arg0, arg1) {
        var ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_message_77738ab37fb0c262 = function(arg0) {
        var ret = getObject(arg0).message;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_name_4bf792b1c494191a = function(arg0) {
        var ret = getObject(arg0).name;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setname_c07cdf3104d0ae75 = function(arg0, arg1, arg2) {
        getObject(arg0).name = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_newnoargs_e2fdfe2af14a2323 = function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_0dad7db75ec90ae7 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_8172f4fed77fdb7c = function() {
        var ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_7039bf8b99f049e1 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_260(a, state0.b, arg0, arg1);
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
    imports.wbg.__wbg_resolve_4df26938859b92e3 = function(arg0) {
        var ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_ffb6e71f7a6735ad = function(arg0, arg1) {
        var ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_021fcdc7f0350b58 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_179e8c2a5a4c73a3 = handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_window_492cfe63a6e41dfa = handleError(function() {
        var ret = window.window;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_globalThis_8ebfea75c2dd63ee = handleError(function() {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_global_62ea2619f58bf94d = handleError(function() {
        var ret = global.global;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_set_afe54b1eeb1aa77c = handleError(function(arg0, arg1, arg2) {
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
    imports.wbg.__wbindgen_closure_wrapper971 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 251, __wbg_adapter_39);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper975 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 251, __wbg_adapter_30);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper977 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 251, __wbg_adapter_42);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1509 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 395, __wbg_adapter_33);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper973 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 251, __wbg_adapter_45);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper969 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 251, __wbg_adapter_36);
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

