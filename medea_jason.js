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

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
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
function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h40d89ff2484e7df4(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_35(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h40d89ff2484e7df4(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_38(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h40d89ff2484e7df4(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_41(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h40d89ff2484e7df4(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_44(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h40d89ff2484e7df4(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_47(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5f8843b5138a8b4d(arg0, arg1, addHeapObject(arg2));
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
function __wbg_adapter_297(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h35e61dbd89ae90f6(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* Describes the directions that the camera can face, as seen from the user's
* perspective. Representation of [VideoFacingModeEnum][1].
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-videofacingmodeenum
*/
export const FacingMode = Object.freeze({
/**
* Facing toward the user (a self-view camera).
*/
User:0,"0":"User",
/**
* Facing away from the user (viewing the environment).
*/
Environment:1,"1":"Environment",
/**
* Facing to the left of the user.
*/
Left:2,"2":"Left",
/**
* Facing to the right of the user.
*/
Right:3,"3":"Right", });
/**
* Media source type.
*/
export const MediaSourceKind = Object.freeze({
/**
* Media is sourced from some media device (webcam or microphone).
*/
Device:0,"0":"Device",
/**
* Media is obtained with screen-capture.
*/
Display:1,"1":"Display", });
/**
* [MediaStreamTrack.kind][1] representation.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediastreamtrack-kind
*/
export const MediaKind = Object.freeze({
/**
* Audio track.
*/
Audio:0,"0":"Audio",
/**
* Video track.
*/
Video:1,"1":"Video", });
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
    * Sets callback, which will be invoked when new [`remote::Track`] will be
    * added to this [`Connection`].
    * @param {Function} f
    */
    on_remote_track_added(f) {
        wasm.connectionhandle_on_remote_track_added(this.ptr, addHeapObject(f));
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
* JS exception for the [`RoomHandle::set_local_media_settings`].
*/
export class ConstraintsUpdateException {

    static __wrap(ptr) {
        const obj = Object.create(ConstraintsUpdateException.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_constraintsupdateexception_free(ptr);
    }
    /**
    * Returns name of this [`ConstraintsUpdateException`].
    * @returns {string}
    */
    name() {
        try {
            const retptr = wasm.__wbindgen_export_5.value - 16;
            wasm.__wbindgen_export_5.value = retptr;
            wasm.constraintsupdateexception_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_5.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Returns [`JasonError`] if this [`ConstraintsUpdateException`] represents
    * `RecoveredException` or `RecoverFailedException`.
    *
    * Returns `undefined` otherwise.
    * @returns {any}
    */
    recover_reason() {
        var ret = wasm.constraintsupdateexception_recover_reason(this.ptr);
        return takeObject(ret);
    }
    /**
    * Returns [`js_sys::Array`] with the [`JasonError`]s if this
    * [`ConstraintsUpdateException`] represents `RecoverFailedException`.
    *
    * Returns `undefined` otherwise.
    * @returns {any}
    */
    recover_fail_reasons() {
        var ret = wasm.constraintsupdateexception_recover_fail_reasons(this.ptr);
        return takeObject(ret);
    }
    /**
    * Returns [`JasonError`] if this [`ConstraintsUpdateException`] represents
    * `ErroredException`.
    *
    * Returns `undefined` otherwise.
    * @returns {any}
    */
    error() {
        var ret = wasm.constraintsupdateexception_error(this.ptr);
        return takeObject(ret);
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
    * [1]: https://w3.org/TR/mediacapture-streams/#dom-constraindomstring
    * @param {number} facing_mode
    */
    exact_facing_mode(facing_mode) {
        wasm.devicevideotrackconstraints_exact_facing_mode(this.ptr, facing_mode);
    }
    /**
    * Sets ideal [facingMode][1] constraint.
    *
    * [1]: https://w3.org/TR/mediacapture-streams/#dom-constraindomstring
    * @param {number} facing_mode
    */
    ideal_facing_mode(facing_mode) {
        wasm.devicevideotrackconstraints_ideal_facing_mode(this.ptr, facing_mode);
    }
    /**
    * Sets exact [`height`][1] constraint.
    *
    * [1]: https://tinyurl.com/w3-streams#def-constraint-height
    * @param {number} height
    */
    exact_height(height) {
        wasm.devicevideotrackconstraints_exact_height(this.ptr, height);
    }
    /**
    * Sets ideal [`height`][1] constraint.
    *
    * [1]: https://tinyurl.com/w3-streams#def-constraint-height
    * @param {number} height
    */
    ideal_height(height) {
        wasm.devicevideotrackconstraints_ideal_height(this.ptr, height);
    }
    /**
    * Sets range of [`height`][1] constraint.
    *
    * [1]: https://tinyurl.com/w3-streams#def-constraint-height
    * @param {number} min
    * @param {number} max
    */
    height_in_range(min, max) {
        wasm.devicevideotrackconstraints_height_in_range(this.ptr, min, max);
    }
    /**
    * Sets exact [`width`][1] constraint.
    *
    * [1]: https://tinyurl.com/w3-streams#def-constraint-width
    * @param {number} width
    */
    exact_width(width) {
        wasm.devicevideotrackconstraints_exact_width(this.ptr, width);
    }
    /**
    * Sets ideal [`width`][1] constraint.
    *
    * [1]: https://tinyurl.com/w3-streams#def-constraint-width
    * @param {number} width
    */
    ideal_width(width) {
        wasm.devicevideotrackconstraints_ideal_width(this.ptr, width);
    }
    /**
    * Sets range of [`width`][1] constraint.
    *
    * [1]: https://tinyurl.com/w3-streams#def-constraint-width
    * @param {number} min
    * @param {number} max
    */
    width_in_range(min, max) {
        wasm.devicevideotrackconstraints_width_in_range(this.ptr, min, max);
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
    * @returns {number}
    */
    kind() {
        var ret = wasm.inputdeviceinfo_kind(this.ptr);
        return ret >>> 0;
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
    * Creates new [`Room`] and returns its [`RoomHandle`].
    * @returns {RoomHandle}
    */
    init_room() {
        var ret = wasm.jason_init_room(this.ptr);
        return RoomHandle.__wrap(ret);
    }
    /**
    * Returns [`MediaManagerHandle`].
    * @returns {MediaManagerHandle}
    */
    media_manager() {
        var ret = wasm.jason_media_manager(this.ptr);
        return MediaManagerHandle.__wrap(ret);
    }
    /**
    * Closes the provided [`RoomHandle`].
    * @param {RoomHandle} room_to_delete
    */
    close_room(room_to_delete) {
        _assertClass(room_to_delete, RoomHandle);
        var ptr0 = room_to_delete.ptr;
        room_to_delete.ptr = 0;
        wasm.jason_close_room(this.ptr, ptr0);
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
* Wrapper around strongly referenced [`Track`] for JS side.
*/
export class LocalMediaTrack {

    static __wrap(ptr) {
        const obj = Object.create(LocalMediaTrack.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_localmediatrack_free(ptr);
    }
    /**
    * Returns the underlying [`sys::MediaStreamTrack`] of this [`JsTrack`].
    * @returns {MediaStreamTrack}
    */
    get_track() {
        var ret = wasm.localmediatrack_get_track(this.ptr);
        return takeObject(ret);
    }
    /**
    * Returns [`MediaKind::Audio`] if this [`JsTrack`] represents an audio
    * track, or [`MediaKind::Video`] if it represents a video track.
    * @returns {number}
    */
    kind() {
        var ret = wasm.localmediatrack_kind(this.ptr);
        return ret >>> 0;
    }
    /**
    * Returns [`JsMediaSourceKind::Device`] if this [`JsTrack`] is sourced
    * from some device (webcam/microphone), or [`JsMediaSourceKind::Display`]
    * if ot is captured via [MediaDevices.getDisplayMedia()][1].
    *
    * [1]: https://w3.org/TR/screen-capture/#dom-mediadevices-getdisplaymedia
    * @returns {number}
    */
    media_source_kind() {
        var ret = wasm.localmediatrack_media_source_kind(this.ptr);
        return ret >>> 0;
    }
}
/**
* JS side handle to [`MediaManager`].
*
* [`MediaManager`] performs all media acquisition requests
* ([getUserMedia()][1]/[getDisplayMedia()][2]) and stores all received tracks
* for further reusage.
*
* [`MediaManager`] stores weak references to [`local::Track`]s, so if there
* are no strong references to some track, then this track is stopped and
* deleted from [`MediaManager`].
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
    * Returns [`local::JsTrack`]s objects, built from provided
    * [`MediaStreamSettings`].
    * @param {MediaStreamSettings} caps
    * @returns {Promise<any>}
    */
    init_local_tracks(caps) {
        _assertClass(caps, MediaStreamSettings);
        var ret = wasm.mediamanagerhandle_init_local_tracks(this.ptr, caps.ptr);
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
    * Creates new [`MediaStreamSettings`] with none constraints configured.
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
    * If [`RpcSession`] is already reconnecting then new reconnection attempt
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
    reconnect_with_backoff(starting_delay_ms, multiplier, max_delay) {
        var ret = wasm.reconnecthandle_reconnect_with_backoff(this.ptr, starting_delay_ms, multiplier, max_delay);
        return takeObject(ret);
    }
}
/**
* Wrapper around [MediaStreamTrack][1] received from the remote.
*
* [1]: https://w3.org/TR/mediacapture-streams/#dom-mediastreamtrack
*/
export class RemoteMediaTrack {

    static __wrap(ptr) {
        const obj = Object.create(RemoteMediaTrack.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_remotemediatrack_free(ptr);
    }
    /**
    * Returns the underlying [`sys::MediaStreamTrack`] of this [`Track`].
    * @returns {MediaStreamTrack}
    */
    get_track() {
        var ret = wasm.localmediatrack_get_track(this.ptr);
        return takeObject(ret);
    }
    /**
    * Indicate whether this [`Track`] is enabled.
    * @returns {boolean}
    */
    enabled() {
        var ret = wasm.remotemediatrack_enabled(this.ptr);
        return ret !== 0;
    }
    /**
    * Sets callback to invoke when this [`Track`] is enabled.
    * @param {Function} callback
    */
    on_enabled(callback) {
        wasm.remotemediatrack_on_enabled(this.ptr, addHeapObject(callback));
    }
    /**
    * Sets callback to invoke when this [`Track`] is disabled.
    * @param {Function} callback
    */
    on_disabled(callback) {
        wasm.remotemediatrack_on_disabled(this.ptr, addHeapObject(callback));
    }
    /**
    * Returns [`MediaKind::Audio`] if this [`Track`] represents an audio
    * track, or [`MediaKind::Video`] if it represents a video track.
    * @returns {number}
    */
    kind() {
        var ret = wasm.remotemediatrack_kind(this.ptr);
        return ret >>> 0;
    }
    /**
    * Returns [`JsMediaSourceKind::Device`] if this [`Track`] is sourced from
    * some device (webcam/microphone), or [`JsMediaSourceKind::Display`] if
    * it's captured via [MediaDevices.getDisplayMedia()][1].
    *
    * [1]: https://w3.org/TR/screen-capture/#dom-mediadevices-getdisplaymedia
    * @returns {number}
    */
    media_source_kind() {
        var ret = wasm.remotemediatrack_media_source_kind(this.ptr);
        return ret >>> 0;
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
    *
    * [`Connection`]: crate::api::Connection
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
    * Sets callback, which will be invoked when new [`local::Track`] will be
    * added to this [`Room`].
    * This might happen in such cases:
    * 1. Media server initiates media request.
    * 2. `disable_audio`/`enable_video` is called.
    * 3. [`MediaStreamSettings`] updated via `set_local_media_settings`.
    * @param {Function} f
    */
    on_local_track(f) {
        wasm.roomhandle_on_local_track(this.ptr, addHeapObject(f));
    }
    /**
    * Sets `on_failed_local_media` callback, which will be invoked on local
    * media acquisition failures.
    * @param {Function} f
    */
    on_failed_local_media(f) {
        wasm.roomhandle_on_failed_local_media(this.ptr, addHeapObject(f));
    }
    /**
    * Sets `on_connection_loss` callback, which will be invoked on connection
    * with server loss.
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
    * - `on_failed_local_media` callback is not set
    * - `on_connection_loss` callback is not set
    * - unable to connect to media server.
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
    * configured for some [`Room`], then this [`Room`] can only send media
    * tracks that correspond to this settings. [`MediaStreamSettings`]
    * update will change media tracks in all sending peers, so that might
    * cause new [getUserMedia()][1] request.
    *
    * Media obtaining/injection errors are additionally fired to
    * `on_failed_local_media` callback.
    *
    * If `stop_first` set to `true` then affected [`local::Track`]s will be
    * dropped before new [`MediaStreamSettings`] is applied. This is usually
    * required when changing video source device due to hardware limitations,
    * e.g. having an active track sourced from device `A` may hinder
    * [getUserMedia()][1] requests to device `B`.
    *
    * `rollback_on_fail` option configures [`MediaStreamSettings`] update
    * request to automatically rollback to previous settings if new settings
    * cannot be applied.
    *
    * If recovering from fail state isn't possible then affected media types
    * will be disabled.
    *
    * [`PeerConnection`]: crate::peer::PeerConnection
    * [1]: https://tinyurl.com/w3-streams#dom-mediadevices-getusermedia
    * @param {MediaStreamSettings} settings
    * @param {boolean} stop_first
    * @param {boolean} rollback_on_fail
    * @returns {Promise<any>}
    */
    set_local_media_settings(settings, stop_first, rollback_on_fail) {
        _assertClass(settings, MediaStreamSettings);
        var ret = wasm.roomhandle_set_local_media_settings(this.ptr, settings.ptr, stop_first, rollback_on_fail);
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
    * @param {number | undefined} source_kind
    * @returns {Promise<any>}
    */
    mute_video(source_kind) {
        var ret = wasm.roomhandle_mute_video(this.ptr, isLikeNone(source_kind) ? 2 : source_kind);
        return takeObject(ret);
    }
    /**
    * Unmutes outbound video in this [`Room`].
    * @param {number | undefined} source_kind
    * @returns {Promise<any>}
    */
    unmute_video(source_kind) {
        var ret = wasm.roomhandle_unmute_video(this.ptr, isLikeNone(source_kind) ? 2 : source_kind);
        return takeObject(ret);
    }
    /**
    * Disables outbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    disable_audio() {
        var ret = wasm.roomhandle_disable_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Enables outbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    enable_audio() {
        var ret = wasm.roomhandle_enable_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Disables outbound video.
    *
    * Affects only video with specific [`JsMediaSourceKind`] if specified.
    * @param {number | undefined} source_kind
    * @returns {Promise<any>}
    */
    disable_video(source_kind) {
        var ret = wasm.roomhandle_disable_video(this.ptr, isLikeNone(source_kind) ? 2 : source_kind);
        return takeObject(ret);
    }
    /**
    * Enables outbound video.
    *
    * Affects only video with specific [`JsMediaSourceKind`] if specified.
    * @param {number | undefined} source_kind
    * @returns {Promise<any>}
    */
    enable_video(source_kind) {
        var ret = wasm.roomhandle_enable_video(this.ptr, isLikeNone(source_kind) ? 2 : source_kind);
        return takeObject(ret);
    }
    /**
    * Disables inbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    disable_remote_audio() {
        var ret = wasm.roomhandle_disable_remote_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Disables inbound video in this [`Room`].
    * @returns {Promise<any>}
    */
    disable_remote_video() {
        var ret = wasm.roomhandle_disable_remote_video(this.ptr);
        return takeObject(ret);
    }
    /**
    * Enables inbound audio in this [`Room`].
    * @returns {Promise<any>}
    */
    enable_remote_audio() {
        var ret = wasm.roomhandle_enable_remote_audio(this.ptr);
        return takeObject(ret);
    }
    /**
    * Enables inbound video in this [`Room`].
    * @returns {Promise<any>}
    */
    enable_remote_video() {
        var ret = wasm.roomhandle_enable_remote_video(this.ptr);
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
    imports.wbg.__wbg_jasonerror_new = function(arg0) {
        var ret = JasonError.__wrap(arg0);
        return addHeapObject(ret);
    };
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
    imports.wbg.__wbg_roomclosereason_new = function(arg0) {
        var ret = RoomCloseReason.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_localmediatrack_new = function(arg0) {
        var ret = LocalMediaTrack.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_reconnecthandle_new = function(arg0) {
        var ret = ReconnectHandle.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_connectionhandle_new = function(arg0) {
        var ret = ConnectionHandle.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_remotemediatrack_new = function(arg0) {
        var ret = RemoteMediaTrack.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        var ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = JSON.stringify(obj === undefined ? null : obj);
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_constraintsupdateexception_new = function(arg0) {
        var ret = ConstraintsUpdateException.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_inputdeviceinfo_new = function(arg0) {
        var ret = InputDeviceInfo.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getdisplaymedia_da88b7d1f14357f5 = handleError(function(arg0, arg1) {
        var ret = get_display_media(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    });
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
    imports.wbg.__wbg_instanceof_Window_49f532f06a9786ee = function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_navigator_95ba9cd684cf90aa = function(arg0) {
        var ret = getObject(arg0).navigator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setTimeout_7df13099c62f73a7 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
    });
    imports.wbg.__wbg_debug_9f067aefe2ceaadd = function(arg0, arg1, arg2, arg3) {
        console.debug(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_error_e325755affc8634b = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_error_7bb15b842d5b0ddb = function(arg0, arg1, arg2, arg3) {
        console.error(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_info_1b9fdabaafc8f4cb = function(arg0, arg1, arg2, arg3) {
        console.info(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_log_37120b26fb738792 = function(arg0, arg1, arg2, arg3) {
        console.log(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_warn_6add4f04160cdbba = function(arg0, arg1, arg2, arg3) {
        console.warn(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_code_4a5510df7ab7d940 = function(arg0) {
        var ret = getObject(arg0).code;
        return ret;
    };
    imports.wbg.__wbg_reason_ad2cc1a1e8e17595 = function(arg0, arg1) {
        var ret = getObject(arg1).reason;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_replaceTrack_7a7089fd0f8a88f7 = function(arg0, arg1) {
        var ret = getObject(arg0).replaceTrack(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_data_5c896013c39c6e21 = function(arg0) {
        var ret = getObject(arg0).data;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_track_02e9fb801ba66a44 = function(arg0) {
        var ret = getObject(arg0).track;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_transceiver_53ac5ff5c0ac62fc = function(arg0) {
        var ret = getObject(arg0).transceiver;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_candidate_5b929ccdcd7d265d = function(arg0) {
        var ret = getObject(arg0).candidate;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_candidate_1b79a781907fd8f7 = function(arg0, arg1) {
        var ret = getObject(arg1).candidate;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sdpMid_36b3a19f66807280 = function(arg0, arg1) {
        var ret = getObject(arg1).sdpMid;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sdpMLineIndex_b7b4dde635ce2e48 = function(arg0) {
        var ret = getObject(arg0).sdpMLineIndex;
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    };
    imports.wbg.__wbg_mid_f1d6f5fc8dfdc133 = function(arg0, arg1) {
        var ret = getObject(arg1).mid;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_sender_9fd57efd642b1107 = function(arg0) {
        var ret = getObject(arg0).sender;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_direction_0ee42ed37f1c9925 = function(arg0) {
        var ret = getObject(arg0).direction;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setdirection_eb18ec4faaede1e1 = function(arg0, arg1) {
        getObject(arg0).direction = takeObject(arg1);
    };
    imports.wbg.__wbg_sdp_aeda3db5bb72ef0f = function(arg0, arg1) {
        var ret = getObject(arg1).sdp;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_iceConnectionState_883f4298574c7809 = function(arg0) {
        var ret = getObject(arg0).iceConnectionState;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithconfiguration_d74dec404e02bb95 = handleError(function(arg0) {
        var ret = new RTCPeerConnection(getObject(arg0));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_addIceCandidate_b19fbc52a1fb256b = function(arg0, arg1) {
        var ret = getObject(arg0).addIceCandidate(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addTransceiver_7be10de5ed38532e = function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).addTransceiver(getStringFromWasm0(arg1, arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_close_1a62d5fb340aa021 = function(arg0) {
        getObject(arg0).close();
    };
    imports.wbg.__wbg_createAnswer_a36770d3784314d7 = function(arg0) {
        var ret = getObject(arg0).createAnswer();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_createOffer_0910dd42b08c1b58 = function(arg0, arg1) {
        var ret = getObject(arg0).createOffer(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getStats_814974d6a5b249d7 = function(arg0) {
        var ret = getObject(arg0).getStats();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getTransceivers_e7d8ad8f3a593604 = function(arg0) {
        var ret = getObject(arg0).getTransceivers();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setLocalDescription_db848d005a895903 = function(arg0, arg1) {
        var ret = getObject(arg0).setLocalDescription(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setRemoteDescription_d63f666265249653 = function(arg0, arg1) {
        var ret = getObject(arg0).setRemoteDescription(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kind_cf0fb98c288cec0c = function(arg0, arg1) {
        var ret = getObject(arg1).kind;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_id_5bf2e29d603fefe7 = function(arg0, arg1) {
        var ret = getObject(arg1).id;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_enabled_b28b04f6d0af1a51 = function(arg0) {
        var ret = getObject(arg0).enabled;
        return ret;
    };
    imports.wbg.__wbg_setenabled_cb2782936ea91aa3 = function(arg0, arg1) {
        getObject(arg0).enabled = arg1 !== 0;
    };
    imports.wbg.__wbg_muted_e91378220dca4172 = function(arg0) {
        var ret = getObject(arg0).muted;
        return ret;
    };
    imports.wbg.__wbg_readyState_82faee55a2bd486d = function(arg0) {
        var ret = getObject(arg0).readyState;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_clone_eeac171e4245c4da = function(arg0) {
        var ret = getObject(arg0).clone();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getSettings_cdc4d4721085f1cf = function(arg0) {
        var ret = getObject(arg0).getSettings();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stop_ff8aee5005e424e7 = function(arg0) {
        getObject(arg0).stop();
    };
    imports.wbg.__wbg_mediaDevices_b4b0a44cf9c9313f = handleError(function(arg0) {
        var ret = getObject(arg0).mediaDevices;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_enumerateDevices_af104c24290d2b33 = handleError(function(arg0) {
        var ret = getObject(arg0).enumerateDevices();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_getUserMedia_f36ade8d88408a9c = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).getUserMedia(getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_getTracks_c19c2981f78e9c98 = function(arg0) {
        var ret = getObject(arg0).getTracks();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addEventListener_6a37bc32387cb66d = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_removeEventListener_70dfb387da1982ac = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_new_df8fc59a35e30ae9 = handleError(function(arg0, arg1) {
        var ret = new WebSocket(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_close_cf4d2841e7f568ba = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).close(arg1, getStringFromWasm0(arg2, arg3));
    });
    imports.wbg.__wbg_send_c6982a9ac7d4b83d = handleError(function(arg0, arg1, arg2) {
        getObject(arg0).send(getStringFromWasm0(arg1, arg2));
    });
    imports.wbg.__wbg_deviceId_e353fc549c5430d2 = function(arg0, arg1) {
        var ret = getObject(arg1).deviceId;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_kind_ee3a87b0295dab41 = function(arg0) {
        var ret = getObject(arg0).kind;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_label_4b26a8e9cf362b6a = function(arg0, arg1) {
        var ret = getObject(arg1).label;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_groupId_aaf7f364657f17d6 = function(arg0, arg1) {
        var ret = getObject(arg1).groupId;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_get_5fa3f454aa041e6e = function(arg0, arg1) {
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
    imports.wbg.__wbg_next_cb7fa0e2183c2836 = function(arg0) {
        var ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_373211328013f949 = handleError(function(arg0) {
        var ret = getObject(arg0).next();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_done_49c598117f977077 = function(arg0) {
        var ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_c9ae6368b110a068 = function(arg0) {
        var ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_b5f9f43455721f6a = function() {
        var ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_85e0a3b459845fe2 = handleError(function(arg0, arg1) {
        var ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_call_951bd0c6d815d6f1 = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_9dff83a08f5994f3 = function() {
        var ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_from_aee16bee83bf975b = function(arg0) {
        var ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_3ddd8187ff2ff82d = function(arg0, arg1) {
        var ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_values_f28e313e2260a03a = function(arg0) {
        var ret = getObject(arg0).values();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Error_659a8e367bd8a8e3 = function(arg0) {
        var ret = getObject(arg0) instanceof Error;
        return ret;
    };
    imports.wbg.__wbg_new_94a7dfa9529ec6e8 = function(arg0, arg1) {
        var ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_message_36191aebccd723bd = function(arg0) {
        var ret = getObject(arg0).message;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_name_39f7db2113c26547 = function(arg0) {
        var ret = getObject(arg0).name;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setname_3b4b98a44f7164ab = function(arg0, arg1, arg2) {
        getObject(arg0).name = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_newnoargs_7c6bd521992b4022 = function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_bf745b1758bb6693 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_ba07d0daa0e4677e = function() {
        var ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_bb4e44ef089e45b4 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_297(a, state0.b, arg0, arg1);
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
    imports.wbg.__wbg_resolve_6e61e640925a0db9 = function(arg0) {
        var ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_dd3785597974798a = function(arg0, arg1) {
        var ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_0f957e0f4c3e537a = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_6baf3a3aa7b63415 = handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_window_63fc4027b66c265b = handleError(function() {
        var ret = window.window;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_globalThis_513fb247e8e4e6d2 = handleError(function() {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_global_b87245cd886d7113 = handleError(function() {
        var ret = global.global;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_set_9bdd413385146137 = handleError(function(arg0, arg1, arg2) {
        var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    });
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
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
    imports.wbg.__wbindgen_closure_wrapper394 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 98, __wbg_adapter_32);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper395 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 98, __wbg_adapter_35);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper396 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 98, __wbg_adapter_38);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper398 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 98, __wbg_adapter_41);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper401 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 98, __wbg_adapter_44);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1928 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 535, __wbg_adapter_47);
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

