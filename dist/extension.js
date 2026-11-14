"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// packages/core/src/formats/registry.js
var require_registry = __commonJS({
  "packages/core/src/formats/registry.js"(exports2, module2) {
    "use strict";
    var FormatRegistry = class {
      constructor() {
        this._byName = /* @__PURE__ */ new Map();
        this._byMime = /* @__PURE__ */ new Map();
        this._byExt = /* @__PURE__ */ new Map();
        this._handlers = /* @__PURE__ */ new Set();
      }
      /**
       * Registers a new format handler.
       * @param {FormatHandler} handler
       */
      register(handler) {
        if (!handler || typeof handler !== "object") {
          throw new TypeError("Format handler must be an object.");
        }
        if (!handler.name || typeof handler.name !== "string") {
          throw new TypeError("Format handler must have a valid string name.");
        }
        const name = handler.name.toLowerCase();
        this._byName.set(name, handler);
        this._handlers.add(handler);
        if (Array.isArray(handler.mimeTypes)) {
          for (const mime of handler.mimeTypes) {
            this._byMime.set(mime.toLowerCase(), handler);
          }
        }
        if (Array.isArray(handler.extensions)) {
          for (const ext of handler.extensions) {
            const normalized = ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
            this._byExt.set(normalized, handler);
          }
        }
      }
      /**
       * Gets a format handler by name.
       * @param {string} name
       * @returns {FormatHandler | undefined}
       */
      getByName(name) {
        if (!name) return void 0;
        return this._byName.get(String(name).toLowerCase());
      }
      /**
       * Gets a format handler by MIME type.
       * @param {string} mime
       * @returns {FormatHandler | undefined}
       */
      getByMime(mime) {
        if (!mime) return void 0;
        return this._byMime.get(String(mime).toLowerCase().split(";")[0].trim());
      }
      /**
       * Gets a format handler by file extension.
       * @param {string} ext
       * @returns {FormatHandler | undefined}
       */
      getByExtension(ext) {
        if (!ext) return void 0;
        const normalized = ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
        return this._byExt.get(normalized);
      }
      /**
       * Detects the format handler matching the input byte signature.
       * @param {Uint8Array | Buffer} bytes
       * @returns {FormatHandler | null}
       */
      detect(bytes) {
        if (!bytes || !bytes.length) return null;
        for (const handler of this._handlers) {
          if (typeof handler.detect === "function") {
            try {
              if (handler.detect(bytes)) {
                return handler;
              }
            } catch {
            }
          }
        }
        return null;
      }
      /**
       * Returns all registered format handlers.
       * @returns {FormatHandler[]}
       */
      getAll() {
        return Array.from(this._handlers);
      }
      /**
       * Returns an array of supported input format names.
       * @returns {string[]}
       */
      getSupportedInputs() {
        return Array.from(this._handlers).filter((h) => h.isInput).map((h) => h.name);
      }
      /**
       * Returns an array of supported output format names.
       * @returns {string[]}
       */
      getSupportedOutputs() {
        return Array.from(this._handlers).filter((h) => h.isOutput).map((h) => h.name);
      }
    };
    var registry = new FormatRegistry();
    module2.exports = {
      FormatRegistry,
      registry,
      registerFormat: (handler) => registry.register(handler),
      getHandlerByName: (name) => registry.getByName(name),
      getHandlerByMime: (mime) => registry.getByMime(mime),
      getHandlerByExtension: (ext) => registry.getByExtension(ext),
      detectFormatHandler: (bytes) => registry.detect(bytes),
      getAllHandlers: () => registry.getAll()
    };
  }
});

// packages/core/src/formats/svg.js
var require_svg = __commonJS({
  "packages/core/src/formats/svg.js"(exports2, module2) {
    "use strict";
    function validateSvgString(input) {
      const svg = Buffer.isBuffer(input) ? input.toString("utf8") : String(input);
      if (Buffer.byteLength(svg) === 0 || !/<svg(?:\s|\/?>)/i.test(svg)) {
        throw new Error("This file does not contain a valid SVG document.");
      }
      if (/<(?:script|foreignObject)\b/i.test(svg) || /\bon\w+\s*=/i.test(svg)) {
        throw new Error("This SVG contains active content and cannot be converted.");
      }
      if (/<!ENTITY\b/i.test(svg)) {
        throw new Error("Custom XML entities are not supported.");
      }
      if (/<!DOCTYPE\b/i.test(svg)) {
        throw new Error("DOCTYPE declarations are not supported.");
      }
      return svg;
    }
    function getSvgDimensions(svg) {
      const widthMatch = svg.match(/\bwidth=["']([0-9.]+)(?:px)?["']/i);
      const heightMatch = svg.match(/\bheight=["']([0-9.]+)(?:px)?["']/i);
      const viewBoxMatch = svg.match(/\bviewBox=["']\s*([0-9.-]+)\s+([0-9.-]+)\s+([0-9.]+)\s+([0-9.]+)\s*["']/i);
      const width = widthMatch ? parseFloat(widthMatch[1]) : viewBoxMatch ? parseFloat(viewBoxMatch[3]) : void 0;
      const height = heightMatch ? parseFloat(heightMatch[1]) : viewBoxMatch ? parseFloat(viewBoxMatch[4]) : void 0;
      return { width, height };
    }
    var svgHandler = {
      name: "svg",
      mimeTypes: Object.freeze(["image/svg+xml"]),
      extensions: Object.freeze([".svg"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: false,
      detect(bytes) {
        if (!bytes || !bytes.length) return false;
        const sample = bytes.subarray(0, Math.min(bytes.length, 4096)).toString("utf8").replace(/^\uFEFF/, "").trimStart();
        return /<svg(?:\s|\/?>)/i.test(sample) || /^<\?xml[\s\S]*?<svg(?:\s|\/?>)/i.test(sample);
      },
      async decode(bytes) {
        const { Resvg } = require("@resvg/resvg-js");
        const sharp = require("sharp");
        const svg = validateSvgString(bytes);
        const dims = getSvgDimensions(svg);
        const width = dims.width || 2048;
        const height = dims.height || 2048;
        const resvg = new Resvg(svg, {
          fitTo: { mode: "original" },
          background: "rgba(0, 0, 0, 0)"
        });
        const pngBuffer = resvg.render().asPng();
        const { data: raw, info } = await sharp(pngBuffer, { limitInputPixels: 4096 * 4096 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode() {
        throw new Error("SVG output encoding from raster is not supported. Zap converts SVG to modern raster formats (WebP, PNG, AVIF).");
      }
    };
    module2.exports = {
      svgHandler,
      validateSvgString,
      getSvgDimensions
    };
  }
});

// packages/core/src/formats/png.js
var require_png = __commonJS({
  "packages/core/src/formats/png.js"(exports2, module2) {
    "use strict";
    var PNG_HEADER = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    var pngHandler = {
      name: "png",
      mimeTypes: Object.freeze(["image/png"]),
      extensions: Object.freeze([".png"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 8) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        return buf.subarray(0, 8).equals(PNG_HEADER);
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const effort = options.effort !== void 0 ? Number(options.effort) : 4;
        return pipeline.png({
          compressionLevel: Math.max(0, Math.min(9, effort)),
          adaptiveFiltering: true
        }).toBuffer();
      }
    };
    module2.exports = {
      pngHandler
    };
  }
});

// packages/core/src/formats/jpeg.js
var require_jpeg = __commonJS({
  "packages/core/src/formats/jpeg.js"(exports2, module2) {
    "use strict";
    var jpegHandler = {
      name: "jpeg",
      mimeTypes: Object.freeze(["image/jpeg", "image/jpg"]),
      extensions: Object.freeze([".jpg", ".jpeg"]),
      supportsAlpha: false,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 3) return false;
        return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        if (options.lossless) {
          throw new Error("JPEG output does not support lossless encoding.");
        }
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let hasAlpha = false;
        for (let i = 3; i < raw.length; i += 4) {
          if (raw[i] < 255) {
            hasAlpha = true;
            break;
          }
        }
        if (hasAlpha && !options.background) {
          throw new Error("JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.");
        }
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background && hasAlpha) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const quality = options.quality !== void 0 ? Math.max(1, Math.min(100, Number(options.quality))) : 85;
        return pipeline.jpeg({
          quality,
          mozjpeg: true
        }).toBuffer();
      }
    };
    module2.exports = {
      jpegHandler
    };
  }
});

// packages/core/src/formats/webp.js
var require_webp = __commonJS({
  "packages/core/src/formats/webp.js"(exports2, module2) {
    "use strict";
    var webpHandler = {
      name: "webp",
      mimeTypes: Object.freeze(["image/webp"]),
      extensions: Object.freeze([".webp"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 12) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        return buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP";
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const quality = options.quality !== void 0 ? Math.max(1, Math.min(100, Number(options.quality))) : 85;
        const effort = options.effort !== void 0 ? Number(options.effort) : 4;
        const lossless = Boolean(options.lossless);
        return pipeline.webp({
          quality,
          alphaQuality: 100,
          lossless,
          effort: Math.round(effort * 6 / 9)
        }).toBuffer();
      }
    };
    module2.exports = {
      webpHandler
    };
  }
});

// packages/core/src/formats/avif.js
var require_avif = __commonJS({
  "packages/core/src/formats/avif.js"(exports2, module2) {
    "use strict";
    var avifHandler = {
      name: "avif",
      mimeTypes: Object.freeze(["image/avif"]),
      extensions: Object.freeze([".avif"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 12) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        if (buf.subarray(4, 8).toString("ascii") === "ftyp") {
          const brands = buf.subarray(8, Math.min(buf.length, 4096)).toString("ascii");
          return brands.includes("avif") || brands.includes("avis");
        }
        return false;
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const quality = options.quality !== void 0 ? Math.max(1, Math.min(100, Number(options.quality))) : 85;
        const effort = options.effort !== void 0 ? Number(options.effort) : 4;
        const lossless = Boolean(options.lossless);
        return pipeline.avif({
          quality,
          lossless,
          effort: Math.max(0, Math.min(9, effort))
        }).toBuffer();
      }
    };
    module2.exports = {
      avifHandler
    };
  }
});

// packages/core/src/formats/gif.js
var require_gif = __commonJS({
  "packages/core/src/formats/gif.js"(exports2, module2) {
    "use strict";
    var gifHandler = {
      name: "gif",
      mimeTypes: Object.freeze(["image/gif"]),
      extensions: Object.freeze([".gif"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: false,
      detect(bytes) {
        if (!bytes || bytes.length < 6) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const sig = buf.subarray(0, 6).toString("ascii");
        return sig === "GIF87a" || sig === "GIF89a";
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode() {
        throw new Error("GIF output encoding is not supported. Zap converts GIF to modern web formats (WebP, PNG, AVIF).");
      }
    };
    module2.exports = {
      gifHandler
    };
  }
});

// packages/core/src/formats/tiff.js
var require_tiff = __commonJS({
  "packages/core/src/formats/tiff.js"(exports2, module2) {
    "use strict";
    var tiffHandler = {
      name: "tiff",
      mimeTypes: Object.freeze(["image/tiff"]),
      extensions: Object.freeze([".tif", ".tiff"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: false,
      detect(bytes) {
        if (!bytes || bytes.length < 4) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        return buf.subarray(0, 4).equals(Buffer.from([73, 73, 42, 0])) || buf.subarray(0, 4).equals(Buffer.from([77, 77, 0, 42])) || buf.subarray(0, 4).equals(Buffer.from([73, 73, 43, 0])) || buf.subarray(0, 4).equals(Buffer.from([77, 77, 0, 43]));
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode() {
        throw new Error("TIFF output encoding is not supported. Zap converts TIFF to modern web formats (WebP, PNG, AVIF).");
      }
    };
    module2.exports = {
      tiffHandler
    };
  }
});

// packages/core/src/formats/index.js
var require_formats = __commonJS({
  "packages/core/src/formats/index.js"(exports2, module2) {
    "use strict";
    var {
      FormatRegistry,
      registry,
      registerFormat,
      getHandlerByName,
      getHandlerByMime,
      getHandlerByExtension,
      detectFormatHandler,
      getAllHandlers
    } = require_registry();
    var { svgHandler } = require_svg();
    var { pngHandler } = require_png();
    var { jpegHandler } = require_jpeg();
    var { webpHandler } = require_webp();
    var { avifHandler } = require_avif();
    var { gifHandler } = require_gif();
    var { tiffHandler } = require_tiff();
    registry.register(svgHandler);
    registry.register(pngHandler);
    registry.register(jpegHandler);
    registry.register(webpHandler);
    registry.register(avifHandler);
    registry.register(gifHandler);
    registry.register(tiffHandler);
    module2.exports = {
      FormatRegistry,
      registry,
      registerFormat,
      getHandlerByName,
      getHandlerByMime,
      getHandlerByExtension,
      detectFormatHandler,
      getAllHandlers,
      svgHandler,
      pngHandler,
      jpegHandler,
      webpHandler,
      avifHandler,
      gifHandler,
      tiffHandler
    };
  }
});

// packages/shared/src/defaults.js
var require_defaults = __commonJS({
  "packages/shared/src/defaults.js"(exports2, module2) {
    "use strict";
    var DEFAULT_OPTIONS = Object.freeze({
      scale: Object.freeze([1]),
      baseWidth: 512,
      quality: 85,
      effort: 4,
      lossless: false,
      clean: true,
      stripMetadata: true,
      outDir: "public/icons",
      maxBytes: 5 * 1024 * 1024,
      onConflict: "skip",
      emitManifest: true,
      fit: "contain",
      to: "webp",
      lockTarget: void 0,
      strict: true
    });
    var DEFAULT_CONVERSION_POLICY = Object.freeze({
      quality: Object.freeze({
        mode: "lossy",
        default: 85,
        perFormat: Object.freeze({})
      }),
      limits: Object.freeze({
        maxInputBytes: 5 * 1024 * 1024,
        maxOutputBytes: void 0,
        targetOutputBytes: void 0
      }),
      formats: Object.freeze({
        accept: Object.freeze([]),
        reject: Object.freeze([])
      }),
      advanced: Object.freeze({
        effort: 4,
        stripMetadata: true,
        preserveColorProfile: false
      })
    });
    module2.exports = {
      DEFAULT_OPTIONS,
      DEFAULT_CONVERSION_POLICY
    };
  }
});

// packages/shared/src/constants.js
var require_constants = __commonJS({
  "packages/shared/src/constants.js"(exports2, module2) {
    "use strict";
    var APP_ORIGIN = "https://zapwebp.vercel.app";
    var DEFAULT_PORT = 3e3;
    var DEFAULT_TIMEOUT_MS = 3e4;
    var MAX_DIMENSION = 4096;
    var MAX_PIXELS = MAX_DIMENSION * MAX_DIMENSION;
    var MAX_SVG_DEPTH = 64;
    var MAX_DATA_URI_BYTES = 1e6;
    var DEFAULT_CACHE_CONTROL = "public, max-age=31536000, immutable";
    var ZAPWEBP_USER_AGENT = "zapwebp/1.2.0";
    module2.exports = {
      APP_ORIGIN,
      DEFAULT_PORT,
      DEFAULT_TIMEOUT_MS,
      MAX_DIMENSION,
      MAX_PIXELS,
      MAX_SVG_DEPTH,
      MAX_DATA_URI_BYTES,
      DEFAULT_CACHE_CONTROL,
      ZAPWEBP_USER_AGENT
    };
  }
});

// packages/shared/src/errors.js
var require_errors = __commonJS({
  "packages/shared/src/errors.js"(exports2, module2) {
    "use strict";
    var ZapwebpError = class extends Error {
      /**
       * @param {object} params
       * @param {string} params.code
       * @param {string} params.message
       * @param {string} [params.fix]
       * @param {string} [params.docs]
       * @param {number} [params.exitCode=1]
       * @param {object} [params.input]
       * @param {string} [params.target]
       * @param {object} [params.suggestedFix]
       */
      constructor({ code, message, fix, docs, exitCode = 1, input, target, suggestedFix, ...rest }) {
        super(message);
        this.name = "ZapwebpError";
        this.code = code;
        this.fix = fix || "";
        this.docs = docs || `https://zapwebp-docs.vercel.app/errors#${code}`;
        this.exitCode = exitCode;
        if (input !== void 0) this.input = input;
        if (target !== void 0) this.target = target;
        if (suggestedFix !== void 0) this.suggestedFix = suggestedFix;
        Object.assign(this, rest);
      }
    };
    var ERROR_CATALOG = Object.freeze({
      E_UNSUPPORTED_FORMAT: {
        code: "E_UNSUPPORTED_FORMAT",
        message: "Cannot decode this file into the locked target format.",
        fix: "Upload a supported format, or install the format plugin for this file."
      },
      E_ALPHA_NOT_REPRESENTABLE: {
        code: "E_ALPHA_NOT_REPRESENTABLE",
        message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
        fix: 'Pass --background "#ffffff" or choose WebP/PNG/AVIF.',
        suggestedFix: { background: "#ffffff" }
      },
      alpha_loss_forbidden: {
        code: "alpha_loss_forbidden",
        message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
        fix: 'Pass --background "#ffffff" or choose --to webp.'
      },
      file_empty: {
        code: "file_empty",
        message: "The input file is empty (0 bytes).",
        fix: "Verify the file source or complete the download before converting."
      },
      unsupported_format: {
        code: "unsupported_format",
        message: "Unsupported or unrecognized image format. Supported inputs: SVG, PNG, JPEG, WebP, AVIF, GIF, and TIFF.",
        fix: "Ensure the file format is supported or install a format expansion plugin."
      },
      svg_invalid: {
        code: "svg_invalid",
        message: "This file does not contain a valid SVG document.",
        fix: "Validate your SVG markup in an editor before converting."
      },
      svg_active_content: {
        code: "svg_active_content",
        message: "This SVG contains active content (<script>, <foreignObject>, or event handlers) and cannot be converted.",
        fix: "Sanitize the SVG to remove scripts or active tags."
      },
      svg_custom_entity: {
        code: "svg_custom_entity",
        message: "Custom XML entities are not supported.",
        fix: "Remove <!ENTITY> declarations from the SVG header."
      },
      svg_doctype_unsupported: {
        code: "svg_doctype_unsupported",
        message: "DOCTYPE declarations are not supported.",
        fix: "Remove <!DOCTYPE> declarations from the SVG header."
      },
      dimensions_exceeded: {
        code: "dimensions_exceeded",
        message: "Image dimensions exceed the 4096 px side or pixel-count limit.",
        fix: "Resize the asset or pass a smaller --width option."
      },
      options_invalid: {
        code: "options_invalid",
        message: "Conversion options must be an object.",
        fix: "Check the CLI flags or options object supplied."
      },
      E_EMPTY_FILE: {
        code: "E_EMPTY_FILE",
        message: "The input file is empty (0 bytes).",
        fix: "Ensure the file was downloaded or copied completely."
      },
      E_CORRUPT_HEADER: {
        code: "E_CORRUPT_HEADER",
        message: "File is too small to contain a valid container header.",
        fix: "The asset appears truncated or corrupt."
      },
      E_UNKNOWN_FORMAT: {
        code: "E_UNKNOWN_FORMAT",
        message: "The file header does not match any recognized format.",
        fix: "Check the file extension or install a community format plugin."
      },
      E_UNSAFE_SVG: {
        code: "E_UNSAFE_SVG",
        message: "SVG contains dangerous or active content.",
        fix: "Remove scripts, foreignObjects, or external URLs from the SVG."
      },
      E_PATH_TRAVERSAL: {
        code: "E_PATH_TRAVERSAL",
        message: "Path escapes working directory boundary.",
        fix: "Specify an input or output path inside the project root."
      },
      E_SSRF_BLOCKED: {
        code: "E_SSRF_BLOCKED",
        message: "Access to local networks, private subnets, and cloud metadata is forbidden.",
        fix: "Provide a publicly accessible HTTPS image URL."
      },
      E_UNSAFE_PROTOCOL: {
        code: "E_UNSAFE_PROTOCOL",
        message: "Only secure HTTPS URLs are permitted.",
        fix: "Use an https:// URL."
      },
      E_CLEAN_FAILED: {
        code: "E_CLEAN_FAILED",
        message: "Metadata handler failed to eliminate targeted metadata.",
        fix: "Inspect the file with zapwebp-lens and check metadata plugins."
      },
      E_CORRUPT_CONTAINER: {
        code: "E_CORRUPT_CONTAINER",
        message: "File container became unreadable after metadata stripping.",
        fix: "Check the metadata plugin implementation."
      },
      E_WRITE_LOCKED: {
        code: "E_WRITE_LOCKED",
        message: "Destination file is locked by another process.",
        fix: "Close any viewer or editor holding a file lock and retry."
      },
      E_WRITE_PERMISSION: {
        code: "E_WRITE_PERMISSION",
        message: "Permission denied writing to destination directory.",
        fix: "Verify write permissions for the destination folder."
      },
      E_READ_PERMISSION: {
        code: "E_READ_PERMISSION",
        message: "Permission denied reading input file.",
        fix: "Verify read permissions for the source file."
      },
      E_DISK_FULL: {
        code: "E_DISK_FULL",
        message: "No space left on device.",
        fix: "Free disk space and re-run conversion."
      },
      E_TOO_LARGE: {
        code: "E_TOO_LARGE",
        message: "Input file exceeds maximum allowed bytes limit.",
        fix: "Compress the input file or increase maxInputBytes in conversion policy."
      },
      E_INPUT_TOO_LARGE: {
        code: "E_INPUT_TOO_LARGE",
        message: "Input file exceeds maximum allowed bytes limit.",
        fix: "Compress the input file or increase maxInputBytes in conversion policy."
      },
      E_OUTPUT_TOO_LARGE: {
        code: "E_OUTPUT_TOO_LARGE",
        message: "Could not compress image below target output bytes limit.",
        fix: "Increase maxOutputBytes, adjust quality, or downscale image dimensions.",
        suggestedFix: { quality: 70 }
      },
      E_SYMLINK_LOOP: {
        code: "E_SYMLINK_LOOP",
        message: "Symlink cycle detected during path traversal.",
        fix: "Remove recursive symlinks or exclude the folder using ignore patterns."
      },
      E_TIMEOUT: {
        code: "E_TIMEOUT",
        message: "Image conversion exceeded the maximum timeout threshold.",
        fix: "Downscale the asset or increase conversion timeout configuration."
      },
      E_WASM_FAILED: {
        code: "E_WASM_FAILED",
        message: "WASM conversion engine failed to initialize.",
        fix: "Ensure WebAssembly is supported in your environment or use the native CLI."
      },
      E_NODE_VERSION: {
        code: "E_NODE_VERSION",
        message: "Current Node.js version is too old. Node.js >= 22.0.0 is required.",
        fix: "Upgrade your Node.js runtime to version 22 or later."
      },
      E_INVALID_CONFIG: {
        code: "E_INVALID_CONFIG",
        message: "Zapwebp configuration file is malformed or invalid.",
        fix: "Check the syntax and option keys in zapwebp.config.js or package.json."
      },
      E_UPLOADER_REQUIRED: {
        code: "E_UPLOADER_REQUIRED",
        message: "createZapStore requires an active conversion handler to convert images.",
        fix: "Provide an uploader callback function in initialConfig or upload options."
      },
      E_CROP_EMPTY: {
        code: "E_CROP_EMPTY",
        message: "The requested crop region has zero or negative dimensions.",
        fix: "Specify valid non-zero crop coordinates within image bounds."
      },
      E_MODEL_FAILED: {
        code: "E_MODEL_FAILED",
        message: "AI detection model failed to load or initialize.",
        fix: "Verify WASM runtime access or fall back to Smart-Subject mode.",
        suggestedFix: { mode: "subject", strategy: "attention" }
      },
      E_RATE_LIMIT: {
        code: "E_RATE_LIMIT",
        message: "Too many requests. Rate limit threshold exceeded.",
        fix: "Wait a few moments before submitting additional requests."
      },
      E_AUTH: {
        code: "E_AUTH",
        message: "Authentication credentials for storage provider are invalid or expired.",
        fix: "Verify API keys, service tokens, or environment credentials."
      },
      E_STORAGE: {
        code: "E_STORAGE",
        message: "Storage provider returned an unhandled error during write or read.",
        fix: "Check remote storage bucket permissions and connection status."
      },
      E_FORMAT_REJECTED: {
        code: "E_FORMAT_REJECTED",
        message: "Image format is rejected by conversion policy allowlist or denylist.",
        fix: "Update accepted formats policy or supply an allowed image file."
      },
      E_UNSUPPORTED_LOCALE: {
        code: "E_UNSUPPORTED_LOCALE",
        message: "Requested locale is not supported.",
        fix: "Choose a supported locale (e.g. en, tl)."
      }
    });
    module2.exports = {
      ZapwebpError,
      ERROR_CATALOG
    };
  }
});

// packages/shared/src/security.js
var require_security = __commonJS({
  "packages/shared/src/security.js"(exports2, module2) {
    "use strict";
    var net = require("node:net");
    function isPrivateIp(hostname) {
      if (!hostname) return true;
      const host = String(hostname).toLowerCase().trim().replace(/^\[|\]$/g, "");
      if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal") || host === "broadcasthost" || host === "0.0.0.0") {
        return true;
      }
      if (net.isIPv4(host)) {
        const parts = host.split(".").map(Number);
        const [a, b] = parts;
        if (a === 0) return true;
        if (a === 127) return true;
        if (a === 10) return true;
        if (a === 172 && b >= 16 && b <= 31) return true;
        if (a === 192 && b === 168) return true;
        if (a === 169 && b === 254) return true;
        if (a === 100 && b >= 64 && b <= 127) return true;
        return false;
      }
      if (net.isIPv6(host)) {
        if (host === "::1" || host === "::") return true;
        if (host.startsWith("fe80:") || host.startsWith("fe90:") || host.startsWith("fea0:") || host.startsWith("feb0:")) {
          return true;
        }
        if (host.startsWith("fc") || host.startsWith("fd")) return true;
        if (host.startsWith("::ffff:")) {
          const v4part = host.slice(7);
          if (net.isIPv4(v4part)) {
            return isPrivateIp(v4part);
          }
        }
        return false;
      }
      return false;
    }
    function validateSafeUrl(urlStr) {
      let parsed;
      try {
        parsed = new URL(urlStr);
      } catch {
        const err = new Error(`Invalid URL format: "${urlStr}"`);
        err.code = "E_UNSAFE_URL";
        throw err;
      }
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        const err = new Error(`Unsupported URL protocol "${parsed.protocol}". Only HTTP and HTTPS are permitted.`);
        err.code = "E_UNSAFE_URL";
        throw err;
      }
      if (isPrivateIp(parsed.hostname)) {
        const err = new Error(`Access to private, loopback, or link-local network address "${parsed.hostname}" is forbidden.`);
        err.code = "E_UNSAFE_URL";
        throw err;
      }
      return parsed;
    }
    module2.exports = {
      isPrivateIp,
      validateSafeUrl
    };
  }
});

// packages/shared/src/i18n.js
var require_i18n = __commonJS({
  "packages/shared/src/i18n.js"(exports2, module2) {
    "use strict";
    var SUPPORTED_LOCALES = Object.freeze(["en", "tl"]);
    var activeLocale = "en";
    var localeCache = /* @__PURE__ */ new Map();
    localeCache.set("en", {
      "dropzone.placeholder": "Drop, paste, or browse",
      "dropzone.hint": "Images, URLs, or SVG code",
      "button.convert": "Convert",
      "button.cancel": "Cancel",
      "button.batch": "Batch",
      "button.download": "Download",
      "button.crop": "Crop",
      "settings.quality": "Quality",
      "settings.clean": "Clean Mode",
      "crop.title": "Crop Image",
      "toast.success": "{{count}} file(s) converted",
      "toast.error": "Error: {{message}}",
      "cli.help": "Convert and optimize common image formats from your terminal."
    });
    localeCache.set("tl", {
      "dropzone.placeholder": "I-drop, i-paste, o i-browse",
      "dropzone.hint": "Mga larawan, URL, o SVG code",
      "button.convert": "I-convert",
      "button.cancel": "Kanselahin",
      "button.batch": "Maramihan",
      "button.download": "I-download",
      "button.crop": "I-crop",
      "settings.quality": "Kalidad",
      "settings.clean": "Malinis na Mode",
      "crop.title": "I-crop ang Imahe",
      "toast.success": "{{count}} (na) file ang na-convert",
      "toast.error": "May error: {{message}}",
      "cli.help": "I-convert at i-optimize ang mga format ng imahe mula sa iyong terminal."
    });
    function setLocale(locale) {
      if (!locale) return;
      const normalized = String(locale).toLowerCase().split(/[-_]/)[0];
      if (SUPPORTED_LOCALES.includes(normalized)) {
        activeLocale = normalized;
      }
    }
    function getLocale() {
      return activeLocale;
    }
    function registerTranslations(locale, strings) {
      if (!locale || !strings || typeof strings !== "object") return;
      const current = localeCache.get(locale) || {};
      localeCache.set(locale, { ...current, ...strings });
    }
    function t(key, vars = {}) {
      const current = localeCache.get(activeLocale) || {};
      const english = localeCache.get("en") || {};
      let text = current[key] ?? english[key] ?? key;
      if (vars && typeof vars === "object") {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), String(v));
        }
      }
      return text;
    }
    module2.exports = {
      SUPPORTED_LOCALES,
      setLocale,
      getLocale,
      registerTranslations,
      t
    };
  }
});

// packages/shared/src/index.js
var require_src = __commonJS({
  "packages/shared/src/index.js"(exports2, module2) {
    "use strict";
    var { DEFAULT_OPTIONS, DEFAULT_CONVERSION_POLICY } = require_defaults();
    var {
      APP_ORIGIN,
      DEFAULT_PORT,
      DEFAULT_TIMEOUT_MS,
      MAX_DIMENSION,
      MAX_PIXELS,
      MAX_SVG_DEPTH,
      MAX_DATA_URI_BYTES,
      DEFAULT_CACHE_CONTROL,
      ZAPWEBP_USER_AGENT
    } = require_constants();
    var { ERROR_CATALOG, ZapwebpError } = require_errors();
    var { isPrivateIp, validateSafeUrl } = require_security();
    var i18n = require_i18n();
    var INPUT_FORMATS = Object.freeze(["svg", "png", "jpeg", "webp", "avif", "gif", "tiff"]);
    var OUTPUT_FORMATS = Object.freeze(["webp", "png", "jpeg", "avif"]);
    var ALPHA_FORMATS = Object.freeze(["svg", "png", "webp", "avif", "gif", "tiff"]);
    var MIME_MAP = Object.freeze({
      svg: "image/svg+xml",
      png: "image/png",
      jpeg: "image/jpeg",
      webp: "image/webp",
      avif: "image/avif",
      gif: "image/gif",
      tiff: "image/tiff"
    });
    var EXT_MAP = Object.freeze({
      svg: [".svg"],
      png: [".png"],
      jpeg: [".jpg", ".jpeg"],
      webp: [".webp"],
      avif: [".avif"],
      gif: [".gif"],
      tiff: [".tif", ".tiff"]
    });
    function getSupportedPairs() {
      const pairs = [];
      for (const from of INPUT_FORMATS) {
        for (const to of OUTPUT_FORMATS) {
          if (from !== to) {
            pairs.push({ from, to, slug: `${from}-to-${to}` });
          }
        }
      }
      return Object.freeze(pairs);
    }
    var supportedPairs = getSupportedPairs();
    function supportsAlpha(format) {
      return ALPHA_FORMATS.includes(String(format).toLowerCase());
    }
    function getMimeType(format) {
      const normalized = format === "jpg" ? "jpeg" : String(format).toLowerCase();
      return MIME_MAP[normalized] || "application/octet-stream";
    }
    function getCanonicalUrl(routePath = "") {
      const cleaned = routePath.startsWith("/") ? routePath : `/${routePath}`;
      return `${APP_ORIGIN}${cleaned}`;
    }
    module2.exports = {
      APP_ORIGIN,
      DEFAULT_PORT,
      DEFAULT_TIMEOUT_MS,
      MAX_DIMENSION,
      MAX_PIXELS,
      MAX_SVG_DEPTH,
      MAX_DATA_URI_BYTES,
      DEFAULT_CACHE_CONTROL,
      ZAPWEBP_USER_AGENT,
      DEFAULT_OPTIONS,
      DEFAULT_CONVERSION_POLICY,
      ERROR_CATALOG,
      ZapwebpError,
      i18n,
      t: i18n.t,
      setLocale: i18n.setLocale,
      getLocale: i18n.getLocale,
      registerTranslations: i18n.registerTranslations,
      SUPPORTED_LOCALES: i18n.SUPPORTED_LOCALES,
      INPUT_FORMATS,
      OUTPUT_FORMATS,
      ALPHA_FORMATS,
      MIME_MAP,
      EXT_MAP,
      supportedPairs,
      getSupportedPairs,
      supportsAlpha,
      getMimeType,
      getCanonicalUrl,
      isPrivateIp,
      validateSafeUrl
    };
  }
});

// packages/core/src/metadata/registry.js
var require_registry2 = __commonJS({
  "packages/core/src/metadata/registry.js"(exports2, module2) {
    "use strict";
    var { ZapwebpError } = require_src();
    var MetadataRegistry = class {
      constructor() {
        this._handlers = /* @__PURE__ */ new Map();
      }
      /**
       * Registers a metadata handler.
       * @param {MetadataHandler} handler
       */
      register(handler) {
        if (!handler || typeof handler !== "object") {
          throw new TypeError("Metadata handler must be an object.");
        }
        if (!handler.name || typeof handler.name !== "string") {
          throw new TypeError("Metadata handler must declare a string name.");
        }
        if (typeof handler.inspect !== "function" || typeof handler.strip !== "function") {
          throw new TypeError(`Metadata handler "${handler.name}" must implement inspect() and strip().`);
        }
        this._handlers.set(handler.name.toLowerCase(), handler);
      }
      /**
       * Gets a handler by name.
       * @param {string} name
       * @returns {MetadataHandler | undefined}
       */
      getByName(name) {
        if (!name) return void 0;
        return this._handlers.get(String(name).toLowerCase());
      }
      /**
       * Returns all registered handlers.
       * @returns {MetadataHandler[]}
       */
      getAll() {
        return Array.from(this._handlers.values());
      }
      /**
       * Runs inspection across all active handlers.
       * @param {Uint8Array | Buffer} bytes
       * @param {object} [options]
       * @param {string[]} [options.strip] - Handler names to apply
       * @param {string[]} [options.keep] - Handler names to skip
       * @returns {Promise<MetadataField[]>}
       */
      async inspect(bytes, options = {}) {
        const active = this._resolveHandlers(options);
        const fields = [];
        for (const handler of active) {
          try {
            const found = await handler.inspect(bytes);
            if (Array.isArray(found)) fields.push(...found);
          } catch {
          }
        }
        return fields;
      }
      /**
       * Strips metadata using registered handlers with Zero-Trust verification.
       * @param {Uint8Array | Buffer} bytes
       * @param {object} [options]
       * @returns {Promise<{ output: Buffer, removed: MetadataField[], kept: MetadataField[] }>}
       */
      async clean(bytes, options = {}) {
        const activeHandlers = this._resolveHandlers(options);
        const removed = [];
        const kept = [];
        for (const handler of this.getAll()) {
          const isTarget = activeHandlers.some((h) => h.name.toLowerCase() === handler.name.toLowerCase());
          try {
            const found = await handler.inspect(bytes);
            if (Array.isArray(found) && found.length) {
              if (isTarget) {
                removed.push(...found);
              } else {
                kept.push(...found);
              }
            }
          } catch {
          }
        }
        if (removed.length === 0) {
          const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
          return { output: buf, removed: [], kept };
        }
        let current = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        for (const handler of activeHandlers) {
          try {
            const stripped = await handler.strip(current, options);
            current = Buffer.isBuffer(stripped) ? stripped : Buffer.from(stripped);
          } catch (err) {
            throw new ZapwebpError({
              code: "E_CLEAN_FAILED",
              message: `Metadata handler "${handler.name}" failed: ${err.message}`
            });
          }
        }
        try {
          if (current.length >= 16) {
            const sharp = require("sharp");
            await sharp(current, { failOn: "none" }).metadata();
          }
        } catch {
          const str = current.toString("utf8");
          if (!str.includes("<svg")) {
            throw new ZapwebpError({
              code: "E_CORRUPT_CONTAINER",
              message: "Output image became unreadable following metadata stripping."
            });
          }
        }
        for (const handler of activeHandlers) {
          const remaining = await handler.inspect(current).catch(() => []);
          if (Array.isArray(remaining) && remaining.length > 0) {
            throw new ZapwebpError({
              code: "E_CLEAN_FAILED",
              message: `Zero-Trust verification failed: Handler "${handler.name}" left ${remaining.length} metadata item(s) in container.`,
              fix: "Review metadata handler strip implementation."
            });
          }
        }
        return { output: current, removed, kept };
      }
      /**
       * Resolves active handlers based on --strip and --keep filters.
       * @private
       */
      _resolveHandlers(options = {}) {
        const all = this.getAll();
        const keep = Array.isArray(options.keep) ? options.keep.map((k) => k.toLowerCase()) : [];
        const strip = Array.isArray(options.strip) ? options.strip.map((s) => s.toLowerCase()) : [];
        if (strip.length > 0) {
          return all.filter((h) => strip.includes(h.name.toLowerCase()) && !keep.includes(h.name.toLowerCase()));
        }
        if (keep.length > 0) {
          return all.filter((h) => !keep.includes(h.name.toLowerCase()));
        }
        return all;
      }
    };
    var metadataRegistry = new MetadataRegistry();
    module2.exports = {
      MetadataRegistry,
      metadataRegistry,
      registerMetadataHandler: (handler) => metadataRegistry.register(handler),
      getMetadataHandlers: () => metadataRegistry.getAll(),
      getMetadataHandlerByName: (name) => metadataRegistry.getByName(name),
      cleanBytes: (bytes, options) => metadataRegistry.clean(bytes, options)
    };
  }
});

// packages/core/src/metadata/exif.js
var require_exif = __commonJS({
  "packages/core/src/metadata/exif.js"(exports2, module2) {
    "use strict";
    var exifHandler = {
      name: "exif",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        if (data.includes(Buffer.from("eXIf"))) {
          fields.push({ type: "EXIF", key: "PNG-eXIf", value: "present", offset: data.indexOf("eXIf") });
        }
        if (data.length >= 4 && data[0] === 255 && data[1] === 216) {
          const idx = data.indexOf(Buffer.from("Exif\0\0"));
          if (idx !== -1) {
            fields.push({ type: "EXIF", key: "JPEG-Exif", value: "present", offset: idx });
          }
        }
        if (data.includes(Buffer.from("EXIF"))) {
          fields.push({ type: "EXIF", key: "WebP-EXIF", value: "present", offset: data.indexOf("EXIF") });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { exifHandler };
  }
});

// packages/core/src/metadata/xmp.js
var require_xmp = __commonJS({
  "packages/core/src/metadata/xmp.js"(exports2, module2) {
    "use strict";
    var xmpHandler = {
      name: "xmp",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        const sample = data.subarray(0, Math.min(data.length, 16384)).toString("utf8");
        if (/<(?:rdf:RDF|xmp:CreatorTool|xmpMM:)/i.test(sample)) {
          fields.push({ type: "XMP", key: "XML-Packet", value: "present", offset: 0 });
        }
        if (data.includes(Buffer.from("http://ns.adobe.com/xap/1.0/")) || data.includes(Buffer.from("XMP "))) {
          fields.push({ type: "XMP", key: "Adobe-XMP", value: "present", offset: data.indexOf("http://ns.adobe.com") });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const text = data.toString("utf8");
        if (text.includes("<svg")) {
          const cleaned = text.replace(/<metadata[\s\S]*?<\/metadata>/gi, "").replace(/<rdf:RDF[\s\S]*?<\/rdf:RDF>/gi, "");
          return Buffer.from(cleaned, "utf8");
        }
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { xmpHandler };
  }
});

// packages/core/src/metadata/c2pa.js
var require_c2pa = __commonJS({
  "packages/core/src/metadata/c2pa.js"(exports2, module2) {
    "use strict";
    var c2paHandler = {
      name: "c2pa",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        if (data.includes(Buffer.from("c2pa")) || data.includes(Buffer.from("jumb"))) {
          fields.push({ type: "C2PA", key: "Provenance-Manifest", value: "present", offset: Math.max(data.indexOf("c2pa"), data.indexOf("jumb")) });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { c2paHandler };
  }
});

// packages/core/src/metadata/png-text.js
var require_png_text = __commonJS({
  "packages/core/src/metadata/png-text.js"(exports2, module2) {
    "use strict";
    var pngTextHandler = {
      name: "png-text",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        for (const chunk of ["tEXt", "iTXt", "zTXt", "tIME", "pHYs"]) {
          if (data.includes(Buffer.from(chunk))) {
            fields.push({ type: "PNG-tEXt", key: chunk, value: "present", offset: data.indexOf(chunk) });
          }
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { pngTextHandler };
  }
});

// packages/core/src/metadata/icc.js
var require_icc = __commonJS({
  "packages/core/src/metadata/icc.js"(exports2, module2) {
    "use strict";
    var iccHandler = {
      name: "icc",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        if (data.includes(Buffer.from("ICC_PROFILE")) || data.includes(Buffer.from("ICCP"))) {
          fields.push({ type: "ICC", key: "Color-Profile", value: "present", offset: Math.max(data.indexOf("ICC_PROFILE"), data.indexOf("ICCP")) });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { iccHandler };
  }
});

// packages/core/src/metadata/index.js
var require_metadata = __commonJS({
  "packages/core/src/metadata/index.js"(exports2, module2) {
    "use strict";
    var {
      MetadataRegistry,
      metadataRegistry,
      registerMetadataHandler,
      getMetadataHandlers,
      getMetadataHandlerByName,
      cleanBytes
    } = require_registry2();
    var { exifHandler } = require_exif();
    var { xmpHandler } = require_xmp();
    var { c2paHandler } = require_c2pa();
    var { pngTextHandler } = require_png_text();
    var { iccHandler } = require_icc();
    metadataRegistry.register(exifHandler);
    metadataRegistry.register(xmpHandler);
    metadataRegistry.register(c2paHandler);
    metadataRegistry.register(pngTextHandler);
    metadataRegistry.register(iccHandler);
    module2.exports = {
      MetadataRegistry,
      metadataRegistry,
      registerMetadataHandler,
      getMetadataHandlers,
      getMetadataHandlerByName,
      cleanBytes,
      exifHandler,
      xmpHandler,
      c2paHandler,
      pngTextHandler,
      iccHandler
    };
  }
});

// packages/core/src/policy.js
var require_policy = __commonJS({
  "packages/core/src/policy.js"(exports2, module2) {
    "use strict";
    var { DEFAULT_CONVERSION_POLICY, ZapwebpError } = require_src();
    function resolvePolicy(customPolicy = {}, optionsFallback = {}) {
      const policy = customPolicy || {};
      const qualityConfig = policy.quality || {};
      let mode = qualityConfig.mode || (optionsFallback.lossless ? "lossless" : void 0);
      if (!mode) mode = DEFAULT_CONVERSION_POLICY.quality.mode;
      if (!["lossy", "lossless", "auto"].includes(mode)) {
        throw new Error(`Policy quality.mode must be 'lossy', 'lossless', or 'auto' (received "${mode}").`);
      }
      const defaultQuality = qualityConfig.default !== void 0 ? Number(qualityConfig.default) : optionsFallback.quality !== void 0 ? Number(optionsFallback.quality) : DEFAULT_CONVERSION_POLICY.quality.default;
      if (!Number.isInteger(defaultQuality) || defaultQuality < 1 || defaultQuality > 100) {
        throw new Error("Policy quality.default must be an integer between 1 and 100.");
      }
      const perFormat = {};
      if (qualityConfig.perFormat && typeof qualityConfig.perFormat === "object") {
        for (const [fmt, q] of Object.entries(qualityConfig.perFormat)) {
          const normalizedFmt = fmt.toLowerCase() === "jpg" ? "jpeg" : fmt.toLowerCase();
          const numQ = Number(q);
          if (Number.isInteger(numQ) && numQ >= 1 && numQ <= 100) {
            perFormat[normalizedFmt] = numQ;
          }
        }
      }
      const limitsConfig = policy.limits || {};
      const maxInputBytes = limitsConfig.maxInputBytes !== void 0 ? Number(limitsConfig.maxInputBytes) : optionsFallback.maxBytes !== void 0 ? Number(optionsFallback.maxBytes) : DEFAULT_CONVERSION_POLICY.limits.maxInputBytes;
      if (!Number.isFinite(maxInputBytes) || maxInputBytes <= 0) {
        throw new Error("Policy limits.maxInputBytes must be a positive number.");
      }
      const maxOutputBytes = limitsConfig.maxOutputBytes !== void 0 ? Number(limitsConfig.maxOutputBytes) : optionsFallback.maxOutputBytes !== void 0 ? Number(optionsFallback.maxOutputBytes) : void 0;
      const targetOutputBytes = limitsConfig.targetOutputBytes !== void 0 ? Number(limitsConfig.targetOutputBytes) : optionsFallback.targetOutputBytes !== void 0 ? Number(optionsFallback.targetOutputBytes) : void 0;
      const formatsConfig = policy.formats || {};
      const normalizeList = (list, fallbackStr) => {
        if (Array.isArray(list)) {
          return list.map((f) => String(f).toLowerCase().trim() === "jpg" ? "jpeg" : String(f).toLowerCase().trim()).filter(Boolean);
        }
        if (typeof list === "string") {
          return list.split(",").map((f) => f.toLowerCase().trim() === "jpg" ? "jpeg" : f.toLowerCase().trim()).filter(Boolean);
        }
        if (fallbackStr && typeof fallbackStr === "string") {
          return fallbackStr.split(",").map((f) => f.toLowerCase().trim() === "jpg" ? "jpeg" : f.toLowerCase().trim()).filter(Boolean);
        }
        return [];
      };
      const accept = normalizeList(formatsConfig.accept, optionsFallback.accept);
      const reject = normalizeList(formatsConfig.reject, optionsFallback.reject);
      const advancedConfig = policy.advanced || {};
      const effort = advancedConfig.effort !== void 0 ? Number(advancedConfig.effort) : optionsFallback.effort !== void 0 ? Number(optionsFallback.effort) : DEFAULT_CONVERSION_POLICY.advanced.effort;
      const stripMetadata = advancedConfig.stripMetadata !== void 0 ? Boolean(advancedConfig.stripMetadata) : optionsFallback.clean !== void 0 ? Boolean(optionsFallback.clean) : DEFAULT_CONVERSION_POLICY.advanced.stripMetadata;
      const preserveColorProfile = advancedConfig.preserveColorProfile !== void 0 ? Boolean(advancedConfig.preserveColorProfile) : DEFAULT_CONVERSION_POLICY.advanced.preserveColorProfile;
      return {
        quality: {
          mode,
          default: defaultQuality,
          perFormat
        },
        limits: {
          maxInputBytes,
          maxOutputBytes,
          targetOutputBytes
        },
        formats: {
          accept,
          reject
        },
        advanced: {
          effort,
          stripMetadata,
          preserveColorProfile
        }
      };
    }
    function checkPolicyInput({ policy, data, detectedFormat }) {
      if (!policy || !data) return;
      if (policy.limits?.maxInputBytes && data.length > policy.limits.maxInputBytes) {
        throw new ZapwebpError({
          code: "E_INPUT_TOO_LARGE",
          message: `Input is ${data.length} bytes, max is ${policy.limits.maxInputBytes}.`,
          fix: "Compress the file, or increase maxInputBytes.",
          inputBytes: data.length,
          maxBytes: policy.limits.maxInputBytes,
          suggestedFix: {
            maxInputBytes: Math.ceil(data.length * 1.05),
            reason: "Input exceeds maximum allowed ingress bytes."
          }
        });
      }
      const fmt = (detectedFormat || "").toLowerCase() === "jpg" ? "jpeg" : (detectedFormat || "").toLowerCase();
      const acceptList = policy.formats?.accept || [];
      const rejectList = policy.formats?.reject || [];
      if (fmt) {
        if (acceptList.length > 0 && !acceptList.includes(fmt)) {
          throw new ZapwebpError({
            code: "E_FORMAT_REJECTED",
            message: `Format "${fmt}" is not in the accept list.`,
            fix: `Add "${fmt}" to accept, or upload a supported format.`,
            detected: fmt,
            allowed: acceptList,
            suggestedFix: {
              accept: [...acceptList, fmt],
              reason: `Format "${fmt}" was rejected because it is not in the policy allowlist.`
            }
          });
        }
        if (rejectList.includes(fmt)) {
          throw new ZapwebpError({
            code: "E_FORMAT_REJECTED",
            message: `Format "${fmt}" is in the reject list.`,
            fix: `Remove "${fmt}" from reject, or upload a different file.`,
            detected: fmt,
            rejected: rejectList,
            suggestedFix: {
              reject: rejectList.filter((f) => f !== fmt),
              reason: `Format "${fmt}" was rejected by policy denylist.`
            }
          });
        }
      }
    }
    function evaluateQuality({ policy, inputFormat, inputBytes = 0, hasAlpha = false, targetFormat = "webp" }) {
      const normInput = (inputFormat || "").toLowerCase() === "jpg" ? "jpeg" : (inputFormat || "").toLowerCase();
      const normTarget = (targetFormat || "").toLowerCase() === "jpg" ? "jpeg" : (targetFormat || "").toLowerCase();
      let mode = policy.quality.mode;
      let quality = policy.quality.default;
      let lossless = false;
      if (mode === "lossless") {
        lossless = true;
        quality = 100;
      } else if (mode === "auto") {
        if (normInput === "svg") {
          lossless = true;
          quality = 100;
        } else if (normInput === "png" && inputBytes < 1e5) {
          lossless = true;
          quality = 100;
        } else if (normInput === "jpeg") {
          lossless = false;
          quality = 75;
        } else if (hasAlpha) {
          lossless = false;
          quality = 90;
        } else {
          lossless = false;
          quality = 80;
        }
      } else {
        lossless = false;
        quality = policy.quality.default;
      }
      if (policy.quality.perFormat) {
        if (policy.quality.perFormat[normInput] !== void 0) {
          quality = policy.quality.perFormat[normInput];
        } else if (policy.quality.perFormat[normTarget] !== void 0) {
          quality = policy.quality.perFormat[normTarget];
        }
      }
      quality = Math.max(1, Math.min(100, Math.round(quality)));
      if (normTarget === "jpeg") {
        lossless = false;
      }
      return {
        quality,
        lossless,
        mode,
        targetQuality: quality
      };
    }
    module2.exports = {
      resolvePolicy,
      checkPolicyInput,
      evaluateQuality
    };
  }
});

// packages/core/package.json
var require_package = __commonJS({
  "packages/core/package.json"(exports2, module2) {
    module2.exports = {
      name: "@zapwebp/core",
      version: "1.1.1",
      description: "Format-aware image conversion engine with transparency-safe outputs.",
      main: "src/index.js",
      types: "src/index.d.ts",
      exports: {
        ".": {
          types: "./src/index.d.ts",
          default: "./src/index.js"
        }
      },
      files: [
        "src",
        "README.md",
        "LICENSE"
      ],
      license: "MIT",
      scripts: {
        test: "node --test"
      },
      engines: {
        node: ">=22"
      },
      dependencies: {
        "@resvg/resvg-js": "^2.6.2",
        "@zapwebp/shared": "workspace:*",
        sharp: "^0.35.5"
      },
      publishConfig: {
        access: "public"
      },
      homepage: "https://zapwebp.vercel.app",
      repository: {
        type: "git",
        url: "https://github.com/Zapwebp/core.git"
      },
      bugs: {
        url: "https://github.com/Zapwebp/core/issues"
      },
      author: "Eldrex Delos Reyes Bula <eldrexdelosreyesbula@gmail.com>"
    };
  }
});

// packages/core/src/registry/transforms.js
var require_transforms = __commonJS({
  "packages/core/src/registry/transforms.js"(exports2, module2) {
    "use strict";
    var TransformRegistry = class {
      constructor() {
        this._transforms = /* @__PURE__ */ new Map();
      }
      /**
       * Registers a transform step.
       * @param {TransformStep} transform
       */
      register(transform) {
        if (!transform || typeof transform !== "object") {
          throw new TypeError("Transform step must be an object.");
        }
        if (!transform.name || typeof transform.name !== "string") {
          throw new TypeError("Transform step must declare a string name.");
        }
        if (typeof transform.apply !== "function") {
          throw new TypeError(`Transform step "${transform.name}" must implement an apply() function.`);
        }
        this._transforms.set(transform.name.toLowerCase(), transform);
      }
      /**
       * Retrieves a registered transform by name.
       * @param {string} name
       * @returns {TransformStep | undefined}
       */
      getByName(name) {
        if (!name) return void 0;
        return this._transforms.get(String(name).toLowerCase());
      }
      /**
       * Returns all registered transforms.
       * @returns {TransformStep[]}
       */
      getAll() {
        return Array.from(this._transforms.values());
      }
    };
    var transformRegistry = new TransformRegistry();
    function registerTransform(transform) {
      transformRegistry.register(transform);
    }
    function getTransforms() {
      return transformRegistry.getAll();
    }
    module2.exports = {
      TransformRegistry,
      transformRegistry,
      registerTransform,
      getTransforms,
      getTransformByName: (name) => transformRegistry.getByName(name)
    };
  }
});

// packages/core/src/index.js
var require_src2 = __commonJS({
  "packages/core/src/index.js"(exports2, module2) {
    "use strict";
    var path = require("node:path");
    var crypto = require("node:crypto");
    var formats = require_formats();
    var metadata = require_metadata();
    var {
      MAX_DIMENSION,
      MAX_PIXELS,
      INPUT_FORMATS,
      OUTPUT_FORMATS,
      DEFAULT_OPTIONS,
      ZapwebpError
    } = require_src();
    var {
      resolvePolicy,
      checkPolicyInput,
      evaluateQuality
    } = require_policy();
    var _sharpInstance = null;
    function getSharp() {
      if (_sharpInstance) return _sharpInstance;
      try {
        _sharpInstance = require("sharp");
        return _sharpInstance;
      } catch (err) {
        throw new ZapwebpError({
          code: "E_ENGINE_UNAVAILABLE",
          message: "Native raster engine (sharp) is not available in this environment: " + (err && err.message ? err.message : String(err)),
          fix: 'Install sharp via "npm install sharp" or ensure native prebuilts are compiled for this architecture.'
        });
      }
    }
    var _resvgInstance = null;
    function getResvg() {
      if (_resvgInstance) return _resvgInstance;
      try {
        const mod = require("@resvg/resvg-js");
        _resvgInstance = mod.Resvg || mod;
        return _resvgInstance;
      } catch (err) {
        throw new ZapwebpError({
          code: "E_ENGINE_UNAVAILABLE",
          message: "Native vector engine (@resvg/resvg-js) is not available in this environment: " + (err && err.message ? err.message : String(err)),
          fix: "Install @resvg/resvg-js or ensure native prebuilts are compiled for this architecture."
        });
      }
    }
    var MAX_WIDTH = MAX_DIMENSION;
    var FIT_MODES = Object.freeze(["contain", "cover", "fill", "inside", "outside"]);
    var SVG_DANGER_RE = /<(?:script|foreignObject)\b|\bon\w+\s*=|<\!ENTITY|<\!DOCTYPE|@import/i;
    function validateImageBytes(input) {
      const data = asBuffer(input);
      if (!data || data.length === 0) {
        throw new ZapwebpError({
          code: "E_EMPTY_FILE",
          message: "The file is empty (0 bytes).",
          fix: "Verify the file source or complete the download before converting."
        });
      }
      if (data.length < 16) {
        const str = data.toString("utf8");
        if (str.includes("<svg")) return;
        throw new ZapwebpError({
          code: "E_CORRUPT_HEADER",
          message: "File is too small to contain a valid container header.",
          fix: "The asset appears truncated or corrupt."
        });
      }
    }
    function asBuffer(input) {
      if (Buffer.isBuffer(input)) return input;
      if (input instanceof Uint8Array) return Buffer.from(input.buffer, input.byteOffset, input.byteLength);
      if (typeof input === "string") return Buffer.from(input, "utf8");
      throw new Error("Image input must be a string or byte array.");
    }
    function detectFormat(input) {
      const data = asBuffer(input);
      if (!data.length) throw new Error("The input file is empty.");
      const registered = formats.detectFormatHandler(data);
      if (registered) return registered.name;
      if (data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "png";
      if (data.length >= 3 && data[0] === 255 && data[1] === 216 && data[2] === 255) return "jpeg";
      if (data.length >= 6 && (data.subarray(0, 6).toString("ascii") === "GIF87a" || data.subarray(0, 6).toString("ascii") === "GIF89a")) return "gif";
      if (data.length >= 12 && data.subarray(0, 4).toString("ascii") === "RIFF" && data.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
      if (data.length >= 12 && data.subarray(4, 8).toString("ascii") === "ftyp") {
        const brands = data.subarray(8, Math.min(data.length, 4096)).toString("ascii");
        if (brands.includes("avif") || brands.includes("avis")) return "avif";
      }
      if (data.length >= 4 && (data.subarray(0, 4).equals(Buffer.from([73, 73, 42, 0])) || data.subarray(0, 4).equals(Buffer.from([77, 77, 0, 42])) || data.subarray(0, 4).equals(Buffer.from([73, 73, 43, 0])) || data.subarray(0, 4).equals(Buffer.from([77, 77, 0, 43])))) return "tiff";
      if (data.length >= 2 && data.subarray(0, 2).toString("ascii") === "BM") throw new Error("BMP input is not supported yet.");
      if (data.length >= 4 && data[0] === 0 && data[1] === 0 && data[2] === 1 && data[3] === 0) throw new Error("ICO input is not supported yet.");
      const text = data.subarray(0, Math.min(data.length, 4096)).toString("utf8").replace(/^\uFEFF/, "").trimStart();
      if (/<svg(?:\s|\/?>)/i.test(text) || /^<\?xml[\s\S]*?<svg(?:\s|\/?>)/i.test(text)) return "svg";
      throw new Error("Unsupported or unrecognized image format. Supported inputs: SVG, PNG, JPEG, WebP, AVIF, GIF, and TIFF.");
    }
    function validateSvg(input) {
      const svg = Buffer.isBuffer(input) ? input.toString("utf8") : String(input);
      if (Buffer.byteLength(svg) === 0 || !/<svg(?:\s|\/?>)/i.test(svg)) throw new Error("This file does not contain a valid SVG document.");
      if (SVG_DANGER_RE.test(svg)) {
        if (/<(?:script|foreignObject)\b/i.test(svg) || /\bon\w+\s*=/i.test(svg)) {
          throw new ZapwebpError({
            code: "E_UNSAFE_SVG",
            message: "This SVG contains active content and cannot be converted.",
            fix: "Remove <script>, inline on* handlers, or foreignObject tags before converting."
          });
        }
        if (/<!ENTITY\b/i.test(svg)) {
          throw new ZapwebpError({
            code: "E_UNSAFE_SVG",
            message: "Custom XML entities are not supported.",
            fix: "Remove <!ENTITY> declarations from the SVG markup."
          });
        }
        if (/<!DOCTYPE\b/i.test(svg)) {
          throw new ZapwebpError({
            code: "E_UNSAFE_SVG",
            message: "DOCTYPE declarations are not supported.",
            fix: "Remove <!DOCTYPE> declarations from the SVG markup."
          });
        }
        if (/@import\b/i.test(svg)) {
          throw new ZapwebpError({
            code: "E_UNSAFE_SVG",
            message: "External stylesheet imports are not supported.",
            fix: "Embed all styles inline within <style> elements without @import."
          });
        }
      }
      let decoded;
      try {
        decoded = svg.replace(/&#x([\da-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16))).replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code))).replace(/&amp;/gi, "&");
      } catch {
        throw new Error("This SVG contains an invalid character reference.");
      }
      let normalized;
      try {
        normalized = decoded.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\\([\da-f]{1,6})\s?/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)));
      } catch {
        throw new Error("This SVG contains an invalid CSS escape.");
      }
      const safeReference = (value) => {
        const ref = value.trim().replace(/^("|')([\s\S]*)\1$/, "$2").trim();
        return ref.startsWith("#") || /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z\d+/=]+$/i.test(ref) || /^data:font\/(?:woff2?|ttf|otf);base64,[a-z\d+/=]+$/i.test(ref);
      };
      const attributeRefs = /(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
      for (const match of normalized.matchAll(attributeRefs)) if (!safeReference(match[2])) throw new Error("External references are not supported. Embed raster images and fonts in the SVG first.");
      if (/@import\b/i.test(normalized)) throw new Error("External stylesheet imports are not supported.");
      for (const match of normalized.matchAll(/url\(\s*([^)]*?)\s*\)/gi)) if (!safeReference(match[1])) throw new Error("External references are not supported. Embed images and fonts in the SVG first.");
      return svg;
    }
    function checkSvgSafety(input, options = {}) {
      try {
        validateSvg(input);
        return { safe: true };
      } catch (err) {
        return { safe: false, reason: "unsafe_svg", detail: err.message };
      }
    }
    function svgDimensions(svg) {
      const root = svg.match(/<svg\b[^>]*>/i)?.[0] || "";
      const attribute = (name) => root.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2];
      const viewBox = attribute("viewBox");
      if (viewBox) {
        const values = viewBox.trim().split(/[\s,]+/).map(Number);
        if (values.length === 4 && values.every(Number.isFinite) && values[2] > 0 && values[3] > 0) return { width: values[2], height: values[3] };
      }
      const dimension = (name) => {
        const value = attribute(name);
        const match = value?.trim().match(/^([+]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(?:px)?$/i);
        return match ? Number(match[1]) : void 0;
      };
      return { width: dimension("width"), height: dimension("height") };
    }
    function detectMetadata(input) {
      const data = asBuffer(input);
      const detected = {
        hasMetadata: false,
        exif: false,
        xmp: false,
        c2pa: false,
        comments: false,
        chunks: [],
        summary: []
      };
      if (!data.length) return detected;
      const textSample = data.subarray(0, Math.min(data.length, 8192)).toString("utf8");
      if (/<(?:rdf:RDF|metadata|dc:format|xmp:CreatorTool)/i.test(textSample)) {
        detected.hasMetadata = true;
        detected.xmp = true;
        detected.summary.push("XMP XML metadata");
      }
      if (/c2pa|jumbf/i.test(textSample)) {
        detected.hasMetadata = true;
        detected.c2pa = true;
        detected.summary.push("C2PA manifest");
      }
      if (data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
        let offset = 8;
        while (offset + 8 <= data.length) {
          const length = data.readUInt32BE(offset);
          const type = data.subarray(offset + 4, offset + 8).toString("ascii");
          detected.chunks.push(type);
          if (["eXIf", "iTXt", "tEXt", "zTXt", "tIME", "pHYs"].includes(type)) {
            detected.hasMetadata = true;
            if (type === "eXIf") {
              detected.exif = true;
              detected.summary.push("PNG eXIf");
            } else if (type === "iTXt" || type === "tEXt" || type === "zTXt") {
              const content = data.subarray(offset + 8, Math.min(offset + 8 + length, data.length)).toString("utf8");
              if (/xmp|adobe|rdf/i.test(content)) detected.xmp = true;
              if (/c2pa|jumb/i.test(content)) detected.c2pa = true;
              detected.summary.push(`PNG ${type}`);
            }
          }
          if (type === "c2pa" || type === "jumb") {
            detected.hasMetadata = true;
            detected.c2pa = true;
            detected.summary.push("PNG C2PA");
          }
          offset += 12 + length;
        }
      }
      if (data.length >= 2 && data[0] === 255 && data[1] === 216) {
        let offset = 2;
        while (offset + 4 <= data.length) {
          if (data[offset] !== 255) {
            offset++;
            continue;
          }
          const marker = data[offset + 1];
          if (marker === 218 || marker === 217) break;
          if (marker === 0 || marker >= 208 && marker <= 215) {
            offset += 2;
            continue;
          }
          const length = data.readUInt16BE(offset + 2);
          if (marker === 225) {
            detected.hasMetadata = true;
            const app1Header = data.subarray(offset + 4, Math.min(offset + 4 + length, data.length)).toString("utf8");
            if (app1Header.startsWith("Exif")) {
              detected.exif = true;
              detected.summary.push("JPEG EXIF");
            } else if (app1Header.includes("adobe.com") || app1Header.includes("xmp")) {
              detected.xmp = true;
              detected.summary.push("JPEG XMP");
            }
          } else if (marker === 235) {
            detected.hasMetadata = true;
            detected.c2pa = true;
            detected.summary.push("JPEG C2PA (JUMBF)");
          } else if (marker === 237) {
            detected.hasMetadata = true;
            detected.summary.push("JPEG Photoshop / IPTC");
          } else if (marker === 254) {
            detected.hasMetadata = true;
            detected.comments = true;
            detected.summary.push("JPEG Comment");
          }
          offset += 2 + length;
        }
      }
      if (data.length >= 12 && data.subarray(0, 4).toString("ascii") === "RIFF" && data.subarray(8, 12).toString("ascii") === "WEBP") {
        let offset = 12;
        while (offset + 8 <= data.length) {
          const fourcc = data.subarray(offset, offset + 4).toString("ascii");
          const size = data.readUInt32LE(offset + 4);
          detected.chunks.push(fourcc);
          if (fourcc === "EXIF") {
            detected.hasMetadata = true;
            detected.exif = true;
            detected.summary.push("WebP EXIF");
          } else if (fourcc === "XMP ") {
            detected.hasMetadata = true;
            detected.xmp = true;
            detected.summary.push("WebP XMP");
          } else if (fourcc === "ICCP") {
            detected.hasMetadata = true;
            detected.summary.push("WebP ICCP");
          }
          offset += 8 + size + size % 2;
        }
      }
      detected.summary = [...new Set(detected.summary)];
      return detected;
    }
    function generateCleanCertificate(output) {
      const data = asBuffer(output);
      const hash = crypto.createHash("sha256").update(data).digest("hex");
      const metadata2 = detectMetadata(data);
      const verified = !metadata2.hasMetadata;
      return {
        sha256: hash,
        chunks: metadata2.chunks,
        metadataChunks: metadata2.summary.length,
        verified,
        verifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
        tool: "zap@1.1.0"
      };
    }
    async function verifyAlpha(input) {
      const data = asBuffer(input);
      const { data: raw, info } = await getSharp()(data, { limitInputPixels: MAX_PIXELS }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const w = info.width;
      const h = info.height;
      const getAlpha = (x, y) => raw[(y * w + x) * 4 + 3];
      const corners = [
        getAlpha(0, 0),
        getAlpha(Math.max(0, w - 1), 0),
        getAlpha(0, Math.max(0, h - 1)),
        getAlpha(Math.max(0, w - 1), Math.max(0, h - 1))
      ];
      let anyTransparent = false;
      for (let i = 3; i < raw.length; i += 4) {
        if (raw[i] < 255) {
          anyTransparent = true;
          break;
        }
      }
      return {
        hasAlpha: anyTransparent,
        alphaPreserved: anyTransparent,
        cornerAlpha: corners
      };
    }
    function auditConversionCommand(command) {
      if (!command || typeof command !== "string") {
        throw new Error("Command must be a non-empty string.");
      }
      const issues = [];
      const cmd = command.trim();
      const isImageMagick = /\b(magick|convert)\b/i.test(cmd);
      const isSvgInput = /\.svg\b/i.test(cmd);
      const isWebpOutput = /\.webp\b/i.test(cmd);
      const isJpegOutput = /\.(jpe?g)\b/i.test(cmd);
      const hasBackgroundNone = /-background\s+none\b/i.test(cmd);
      const hasStrip = /-strip\b/i.test(cmd);
      if (isImageMagick && isSvgInput && !hasBackgroundNone) {
        issues.push("ImageMagick defaults to compositing SVG onto a solid black or opaque canvas unless -background none is passed.");
      }
      if (isImageMagick && !hasStrip) {
        issues.push("Command does not strip container metadata (EXIF/XMP/C2PA/software provenance).");
      }
      if (isJpegOutput && isSvgInput) {
        issues.push("Target format is JPEG, which cannot store transparency. Transparent regions will turn black unless an explicit background color is flattened.");
      }
      if (/\bcwebp\b/i.test(cmd) && isSvgInput) {
        issues.push("cwebp cannot decode vector SVG directly; passing SVG directly to cwebp fails.");
      }
      const safe = issues.length === 0;
      const inputMatch = cmd.match(/['"]?([a-zA-Z0-9_\-./\\]+\.(svg|png|jpe?g|webp|avif|gif|tiff?))['"]?/i);
      const file = inputMatch ? inputMatch[1] : "image.svg";
      const outExt = isWebpOutput ? "webp" : isJpegOutput ? "jpg" : "webp";
      const recommendedCommand = `zap "${file}" --to ${outExt} --clean`;
      return {
        safe,
        issues,
        recommendedCommand
      };
    }
    function explainBlackBackground(context = {}) {
      return {
        cause: "Single-step rasterization without explicit transparent canvas initialization or alpha quality retention.",
        technicalDetails: [
          "ImageMagick and Cairo default uninitialized raster canvases to solid black (RGB 0, 0, 0) instead of transparent RGBA (0, 0, 0, 0).",
          "Many WebP encoders drop alpha or set alpha compression quality to 0 in lossy mode unless explicitly given alpha_q: 100.",
          "JPEG targets lack an alpha channel entirely, collapsing all transparent pixels into black boxes."
        ],
        remedy: "Use a two-stage pipeline: (1) render SVG over explicit transparent canvas (resvg), then (2) encode to WebP with alpha retention (cwebp -alpha_q 100).",
        zapSolution: 'zap <file.svg> --to webp (or convert_image MCP tool). Zap always defaults background to "transparent" and enforces alpha preservation by construction.'
      };
    }
    function normalizeOptions(options = {}) {
      if (!options || typeof options !== "object" || Array.isArray(options)) throw new Error("Conversion options must be an object.");
      const lockTarget = options.lockTarget || options.lock;
      const overrideLock = Boolean(options.overrideLock);
      const strict = options.strict !== void 0 ? Boolean(options.strict) : true;
      let to;
      if (lockTarget && !overrideLock) {
        to = String(lockTarget).toLowerCase();
      } else {
        to = String(options.to ?? DEFAULT_OPTIONS.to).toLowerCase();
      }
      if (!OUTPUT_FORMATS.includes(to)) throw new Error(`Unsupported output format: ${to}. Choose ${OUTPUT_FORMATS.join(", ")}.`);
      const quality = Number(options.quality ?? DEFAULT_OPTIONS.quality);
      if (!Number.isInteger(quality) || quality < 0 || quality > 100) throw new Error("Quality must be an integer between 0 and 100.");
      const effort = Number(options.effort ?? DEFAULT_OPTIONS.effort);
      if (!Number.isInteger(effort) || effort < 0 || effort > 9) throw new Error("Effort must be an integer between 0 and 9.");
      const dimension = (key) => {
        if (options[key] === void 0) return void 0;
        const value = Number(options[key]);
        if (!Number.isInteger(value) || value < 1 || value > MAX_WIDTH) throw new Error(`${key} must be an integer between 1 and ${MAX_WIDTH}.`);
        return value;
      };
      const width = dimension("width");
      const height = dimension("height");
      const fit = String(options.fit ?? DEFAULT_OPTIONS.fit).toLowerCase();
      if (!FIT_MODES.includes(fit)) throw new Error(`Fit must be one of ${FIT_MODES.join(", ")}.`);
      if (options.lossless !== void 0 && typeof options.lossless !== "boolean") throw new Error("Lossless must be a boolean.");
      if (options.stripMetadata !== void 0 && typeof options.stripMetadata !== "boolean") throw new Error("stripMetadata must be a boolean.");
      if (options.clean !== void 0 && typeof options.clean !== "boolean") throw new Error("clean must be a boolean.");
      const clean = options.clean !== void 0 ? Boolean(options.clean) : options.stripMetadata ?? DEFAULT_OPTIONS.clean;
      const stripMetadata = clean;
      const verify = Boolean(options.verify || options.verifyClean);
      const assertAlpha = Boolean(options.assertAlpha);
      const report = Boolean(options.report);
      const transforms = Array.isArray(options.transforms) ? options.transforms.filter((t) => t && typeof t.apply === "function") : void 0;
      for (const key of ["background", "svgBackground"]) if (options[key] !== void 0 && (typeof options[key] !== "string" || !options[key].trim() || options[key].length > 64)) throw new Error(`${key} must be a non-empty color string of 64 characters or fewer.`);
      return {
        to,
        width,
        height,
        fit,
        quality,
        lossless: options.lossless ?? false,
        effort,
        background: options.background,
        svgBackground: options.svgBackground,
        stripMetadata,
        clean,
        verify,
        assertAlpha,
        report,
        transforms,
        lockTarget,
        strict,
        overrideLock,
        policy: options.policy,
        maxOutputBytes: options.maxOutputBytes,
        targetOutputBytes: options.targetOutputBytes,
        accept: options.accept,
        reject: options.reject
      };
    }
    function checkDimensions(width, height) {
      if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1 || width > MAX_WIDTH || height > MAX_WIDTH || width * height > MAX_PIXELS) {
        throw new Error(`Image dimensions exceed the ${MAX_WIDTH} px side or pixel-count limit.`);
      }
    }
    async function inspectImage(input) {
      const data = asBuffer(input);
      const format = detectFormat(data);
      const metadata2 = detectMetadata(data);
      if (format === "svg") {
        const svg = validateSvg(data);
        const { width, height } = svgDimensions(svg);
        if (width && height && (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)) throw new Error("The SVG has invalid intrinsic dimensions.");
        return { format, width: width || void 0, height: height || void 0, hasAlpha: true, bytes: data.length, metadata: metadata2 };
      }
      const meta = await getSharp()(data, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" }).metadata();
      checkDimensions(meta.width, meta.height);
      return { format, width: meta.width, height: meta.height, hasAlpha: Boolean(meta.hasAlpha), bytes: data.length, metadata: metadata2 };
    }
    async function convertImage(input, options = {}) {
      const opts = normalizeOptions(options);
      const policy = resolvePolicy(opts.policy, opts);
      const data = asBuffer(input);
      if (policy.limits?.maxInputBytes && data.length > policy.limits.maxInputBytes) {
        throw new ZapwebpError({
          code: "E_INPUT_TOO_LARGE",
          message: `Input is ${data.length} bytes, max is ${policy.limits.maxInputBytes}.`,
          fix: "Compress the file, or increase maxInputBytes.",
          inputBytes: data.length,
          maxBytes: policy.limits.maxInputBytes,
          suggestedFix: {
            maxInputBytes: Math.ceil(data.length * 1.05),
            reason: "Input exceeds maximum allowed ingress bytes."
          }
        });
      }
      validateImageBytes(data);
      let format;
      try {
        format = detectFormat(data);
      } catch (err) {
        if (opts.lockTarget && !opts.strict) {
          return {
            data,
            format: "unknown",
            width: void 0,
            height: void 0,
            size: data.length,
            alphaPreserved: false,
            alphaVerified: false,
            clean: false,
            removedMetadata: [],
            passedThrough: true,
            targetLockEnforced: Boolean(opts.lockTarget && !opts.overrideLock),
            targetLockBypassed: Boolean(opts.lockTarget && opts.overrideLock)
          };
        }
        if (opts.lockTarget && opts.strict) {
          throw new ZapwebpError({
            code: "E_UNSUPPORTED_FORMAT",
            message: `Cannot decode this file into the locked target format (${opts.to}).`,
            fix: "Upload a supported format, or install the format plugin for this file.",
            input: {
              detectedFormat: "unknown",
              bytes: data.length
            },
            target: opts.to
          });
        }
        throw err;
      }
      checkPolicyInput({ policy, data, detectedFormat: format });
      let source = data;
      let sourceHasAlpha;
      if (format === "svg") {
        const svg = validateSvg(data);
        const dims = svgDimensions(svg);
        const aspect = dims.width && dims.height ? dims.height / dims.width : 1;
        const fitByCover = opts.fit === "cover" || opts.fit === "outside";
        const renderMode = opts.width && opts.height ? fitByCover === aspect > opts.height / opts.width ? "width" : "height" : opts.height && !opts.width ? "height" : "width";
        const renderValue = renderMode === "height" ? opts.height ?? opts.width ?? 2048 : opts.width ?? opts.height ?? 2048;
        const rasterWidth = renderMode === "width" ? renderValue : Math.ceil(renderValue / aspect);
        const rasterHeight = renderMode === "height" ? renderValue : Math.ceil(renderValue * aspect);
        checkDimensions(rasterWidth, rasterHeight);
        const resvgOptions = { background: opts.svgBackground ?? "rgba(0, 0, 0, 0)" };
        resvgOptions.fitTo = { mode: renderMode, value: renderValue };
        const ResvgClass = getResvg();
        source = new ResvgClass(svg, resvgOptions).render().asPng();
        const svgMeta = await getSharp()(source, { limitInputPixels: MAX_PIXELS }).metadata();
        sourceHasAlpha = Boolean(svgMeta.hasAlpha);
      } else {
        const meta = await getSharp()(source, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" }).metadata();
        checkDimensions(meta.width, meta.height);
        sourceHasAlpha = Boolean(meta.hasAlpha);
      }
      const transformReports = [];
      let rawBufferInfo = null;
      if (opts.transforms && opts.transforms.length > 0) {
        let raw = await decodeToRgba(source, format === "svg" ? "png" : format);
        for (const step of opts.transforms) {
          if (typeof step.apply === "function") {
            const inputDims = { width: raw.width, height: raw.height };
            const transformed = await step.apply(raw, opts);
            if (!transformed || !transformed.data || !transformed.width || !transformed.height) {
              throw new Error(`Transform "${step.name || "unknown"}" returned an invalid RawImage.`);
            }
            checkDimensions(transformed.width, transformed.height);
            raw = transformed;
            const meta = typeof step.getMetadata === "function" ? step.getMetadata() : step.metadata || {};
            transformReports.push({
              name: step.name || "transform",
              input: inputDims,
              output: { width: raw.width, height: raw.height },
              ...meta
            });
          }
        }
        let hasAlpha = false;
        for (let i = 3; i < raw.data.length; i += 4) {
          if (raw.data[i] < 255) {
            hasAlpha = true;
            break;
          }
        }
        sourceHasAlpha = hasAlpha;
        const rawBuffer = Buffer.isBuffer(raw.data) ? raw.data : Buffer.from(raw.data.buffer, raw.data.byteOffset, raw.data.byteLength);
        rawBufferInfo = {
          buffer: rawBuffer,
          rawOptions: {
            width: raw.width,
            height: raw.height,
            channels: 4
          }
        };
      }
      const evalQ = evaluateQuality({
        policy,
        inputFormat: format,
        inputBytes: data.length,
        hasAlpha: sourceHasAlpha,
        targetFormat: opts.to
      });
      const targetQuality = options.quality !== void 0 ? Number(options.quality) : evalQ.quality;
      const targetLossless = options.lossless !== void 0 ? Boolean(options.lossless) : evalQ.lossless;
      if (opts.to === "jpeg" && sourceHasAlpha && !opts.background) {
        throw new ZapwebpError({
          code: "E_ALPHA_NOT_REPRESENTABLE",
          message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
          fix: 'Pass --background "#ffffff" or choose WebP/PNG/AVIF.',
          suggestedFix: { background: "#ffffff" }
        });
      }
      if (opts.to === "jpeg" && targetLossless) throw new Error("JPEG output does not support lossless encoding.");
      const createPipeline = () => {
        const sharpInstance = getSharp();
        if (rawBufferInfo) {
          return sharpInstance(rawBufferInfo.buffer, { raw: rawBufferInfo.rawOptions });
        }
        return sharpInstance(source, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" });
      };
      const encodeWithQuality = async (q, isLossless) => {
        let p = createPipeline();
        if (opts.width || opts.height) p = p.resize({ width: opts.width, height: opts.height, fit: opts.fit, withoutEnlargement: false });
        if (opts.background && sourceHasAlpha) p = p.flatten({ background: opts.background });
        if (!policy.advanced.stripMetadata) p = p.withMetadata();
        const effort = policy.advanced.effort ?? opts.effort;
        if (opts.to === "webp") p = p.webp({ quality: q, alphaQuality: 100, lossless: isLossless, effort: Math.round(effort * 6 / 9) });
        else if (opts.to === "png") p = p.png({ compressionLevel: effort, adaptiveFiltering: true });
        else if (opts.to === "jpeg") p = p.jpeg({ quality: q, mozjpeg: true });
        else p = p.avif({ quality: q, lossless: isLossless, effort });
        return await p.toBuffer({ resolveWithObject: true });
      };
      let effectiveQuality = targetQuality;
      let effectiveLossless = targetLossless;
      let { data: output, info } = await encodeWithQuality(effectiveQuality, effectiveLossless);
      checkDimensions(info.width, info.height);
      let qualityReducedBy = 0;
      let maxOutputHit = false;
      const limitMaxOutput = policy.limits?.maxOutputBytes || policy.limits?.targetOutputBytes;
      if (limitMaxOutput && output.length > limitMaxOutput) {
        let currentQ = effectiveQuality;
        while (output.length > limitMaxOutput && currentQ > 10) {
          currentQ -= 5;
          const res = await encodeWithQuality(currentQ, false);
          output = res.data;
          info = res.info;
        }
        if (output.length > limitMaxOutput) {
          throw new ZapwebpError({
            code: "E_OUTPUT_TOO_LARGE",
            message: `Cannot fit output in ${limitMaxOutput} bytes (reached ${output.length} bytes at quality ${currentQ}).`,
            fix: "Increase maxOutputBytes, or downscale the image.",
            actualBytes: output.length,
            maxBytes: limitMaxOutput,
            suggestedFix: {
              quality: 10,
              reason: "Image exceeds maxOutputBytes even after reducing quality to 10."
            }
          });
        }
        qualityReducedBy = effectiveQuality - currentQ;
        effectiveQuality = currentQ;
        effectiveLossless = false;
        maxOutputHit = true;
      }
      const inputMetadata = detectMetadata(data);
      const alphaPreserved = opts.to !== "jpeg" && sourceHasAlpha && !opts.background;
      let certificate;
      if (opts.verify) {
        certificate = generateCleanCertificate(output);
      }
      if (opts.assertAlpha && sourceHasAlpha) {
        const check = await verifyAlpha(output);
        if (!check.hasAlpha) {
          throw new Error("Alpha assertion failed: output image does not contain transparent pixels.");
        }
      }
      const backgroundStatus = sourceHasAlpha ? opts.background ? "flattened" : "preserved_alpha" : "preserved_opaque";
      const transparency = backgroundStatus === "flattened" ? "flattened" : sourceHasAlpha ? "preserved" : "preserved_opaque";
      return {
        data: output,
        format: opts.to,
        width: info.width,
        height: info.height,
        size: output.length,
        alphaPreserved,
        alphaVerified: alphaPreserved,
        backgroundStatus,
        transparency,
        flattenColor: opts.background || void 0,
        clean: opts.clean,
        removedMetadata: inputMetadata.summary,
        certificate,
        transforms: transformReports.length > 0 ? transformReports : void 0,
        targetLockEnforced: Boolean(opts.lockTarget && !opts.overrideLock),
        targetLockBypassed: Boolean(opts.lockTarget && opts.overrideLock),
        policy: {
          quality: {
            mode: evalQ.mode,
            used: effectiveQuality,
            target: evalQ.targetQuality,
            reducedBy: qualityReducedBy,
            reason: qualityReducedBy > 0 ? "to fit maxOutputBytes" : "as specified"
          },
          limits: {
            maxInputBytes: policy.limits.maxInputBytes,
            maxOutputBytes: limitMaxOutput,
            maxOutputHit
          },
          format: {
            input: format,
            output: opts.to,
            accepted: true
          }
        }
      };
    }
    async function convert(input, options = {}) {
      const result = await convertImage(input, options);
      const out = result.data;
      out.format = result.format;
      out.width = result.width;
      out.height = result.height;
      out.size = result.size;
      out.alphaPreserved = result.alphaPreserved;
      out.certificate = result.certificate;
      out.targetLockEnforced = result.targetLockEnforced;
      out.targetLockBypassed = result.targetLockBypassed;
      out.passedThrough = Boolean(result.passedThrough);
      out.data = result.data;
      out.policy = result.policy;
      return out;
    }
    async function decodeToRgba(input, format) {
      const data = asBuffer(input);
      const fmt = format ? String(format).toLowerCase() : detectFormat(data);
      let source = data;
      if (fmt === "svg") {
        const svg = validateSvg(data);
        const dims = svgDimensions(svg);
        const width = dims.width || 2048;
        const height = dims.height || 2048;
        checkDimensions(width, height);
        const ResvgClass = getResvg();
        source = new ResvgClass(svg, { fitTo: { mode: "original" }, background: "rgba(0, 0, 0, 0)" }).render().asPng();
      }
      const pipeline = getSharp()(source, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" }).ensureAlpha();
      const { data: raw, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
      checkDimensions(info.width, info.height);
      return {
        data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
        width: info.width,
        height: info.height
      };
    }
    async function encodeFromRgba(image, options = {}) {
      if (!image || !image.data || !Number.isInteger(image.width) || !Number.isInteger(image.height)) {
        throw new Error("image must be an object with data (RGBA bytes), width, and height.");
      }
      checkDimensions(image.width, image.height);
      const opts = normalizeOptions(options);
      const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
      let hasAlpha = false;
      for (let i = 3; i < raw.length; i += 4) {
        if (raw[i] < 255) {
          hasAlpha = true;
          break;
        }
      }
      if (opts.to === "jpeg" && hasAlpha && !opts.background) {
        throw new ZapwebpError({
          code: "E_ALPHA_NOT_REPRESENTABLE",
          message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
          fix: 'Pass --background "#ffffff" or choose WebP/PNG/AVIF.',
          suggestedFix: { background: "#ffffff" }
        });
      }
      if (opts.to === "jpeg" && opts.lossless) {
        throw new Error("JPEG output does not support lossless encoding.");
      }
      let pipeline = getSharp()(raw, {
        raw: {
          width: image.width,
          height: image.height,
          channels: 4
        }
      });
      if (opts.width || opts.height) {
        pipeline = pipeline.resize({
          width: opts.width,
          height: opts.height,
          fit: opts.fit,
          withoutEnlargement: false
        });
      }
      if (opts.background && hasAlpha) {
        pipeline = pipeline.flatten({ background: opts.background });
      }
      if (!opts.stripMetadata) {
        pipeline = pipeline.withMetadata();
      }
      const quality = Math.max(1, opts.quality);
      if (opts.to === "webp") {
        pipeline = pipeline.webp({ quality, alphaQuality: 100, lossless: opts.lossless, effort: Math.round(opts.effort * 6 / 9) });
      } else if (opts.to === "png") {
        pipeline = pipeline.png({ compressionLevel: opts.effort, adaptiveFiltering: true });
      } else if (opts.to === "jpeg") {
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
      } else {
        pipeline = pipeline.avif({ quality, lossless: opts.lossless, effort: opts.effort });
      }
      const { data: outBuffer, info } = await pipeline.toBuffer({ resolveWithObject: true });
      checkDimensions(info.width, info.height);
      return outBuffer;
    }
    async function convertSvgToWebp(input, options = {}) {
      return convertImage(input, { ...options, to: "webp" });
    }
    function parseScales(scaleInput) {
      if (scaleInput === void 0 || scaleInput === null) return [1];
      const list = Array.isArray(scaleInput) ? scaleInput : String(scaleInput).split(",").map((s) => s.trim()).filter(Boolean);
      const parsed = list.map((item) => {
        const num = Number(item);
        if (!Number.isFinite(num) || num <= 0) {
          throw new Error(`Scale multiplier must be a positive number, received: ${item}`);
        }
        return num;
      });
      if (!parsed.length) return [1];
      return [...new Set(parsed)].sort((a, b) => a - b);
    }
    function scaleSuffix(scale) {
      if (scale === 1) return "";
      return `@${scale}x`;
    }
    function outputName(inputPath, format = "webp", scale = 1) {
      const extension = format === "jpeg" ? "jpg" : format;
      const base = path.basename(inputPath, path.extname(inputPath)) || "image";
      const suffix = scaleSuffix(scale);
      return `${base}${suffix}.${extension}`;
    }
    function generateSrcset(baseFile, scales = [1], format = "webp", alt = "") {
      const base = path.basename(baseFile, path.extname(baseFile)) || "image";
      const ext = format === "jpeg" ? "jpg" : format;
      const sorted = parseScales(scales);
      const primaryFile = `${base}.${ext}`;
      const srcsetString = sorted.map((s) => `${base}${scaleSuffix(s)}.${ext} ${s}x`).join(", ");
      return `<img src="${primaryFile}" srcset="${srcsetString}" alt="${alt}">`;
    }
    var pkg = require_package();
    var { registerTransform, getTransforms } = require_transforms();
    function getVersion() {
      return pkg.version;
    }
    function getFormats() {
      return formats.getAllHandlers().map((h) => h.name);
    }
    module2.exports = {
      // Frozen Seven Public Functions (Enterprise Architecture Core API Surface)
      convert,
      inspect: inspectImage,
      registerFormat: formats.registerFormat,
      registerMetadataHandler: metadata.registerMetadataHandler,
      registerTransform,
      getVersion,
      getFormats,
      // Backwards-Compatible Surfaces
      convertImage,
      convertSvgToWebp,
      decodeToRgba,
      encodeFromRgba,
      detectFormat,
      detectMetadata,
      generateCleanCertificate,
      verifyAlpha,
      auditConversionCommand,
      explainBlackBackground,
      inspectImage,
      validateSvg,
      validateImageBytes,
      checkSvgSafety,
      normalizeOptions,
      parseScales,
      scaleSuffix,
      outputName,
      generateSrcset,
      resolvePolicy,
      checkPolicyInput,
      evaluateQuality,
      formats,
      registry: formats.registry,
      getHandlerByName: formats.getHandlerByName,
      getHandlerByMime: formats.getHandlerByMime,
      detectFormatHandler: formats.detectFormatHandler,
      getAllHandlers: formats.getAllHandlers,
      metadata,
      MetadataRegistry: metadata.MetadataRegistry,
      metadataRegistry: metadata.metadataRegistry,
      getMetadataHandlers: metadata.getMetadataHandlers,
      cleanBytes: metadata.cleanBytes,
      getTransforms,
      getSharp,
      getResvg,
      MAX_WIDTH,
      INPUT_FORMATS,
      OUTPUT_FORMATS,
      FIT_MODES
    };
  }
});

// apps/vscode/src/core.js
var require_core = __commonJS({
  "apps/vscode/src/core.js"(exports2, module2) {
    "use strict";
    var fs = require("node:fs");
    var path = require("node:path");
    var os = require("node:os");
    var Module = require("node:module");
    var { execFile, spawn, execSync } = require("node:child_process");
    function setupNativeResolution() {
      const extraDirs = [];
      try {
        const vscode2 = require("vscode");
        if (vscode2.workspace && Array.isArray(vscode2.workspace.workspaceFolders)) {
          for (const folder of vscode2.workspace.workspaceFolders) {
            const root = folder.uri.fsPath;
            extraDirs.push(path.join(root, "node_modules"));
            extraDirs.push(path.join(root, "apps", "vscode", "node_modules"));
            extraDirs.push(path.join(root, "packages", "core", "node_modules"));
          }
        }
      } catch {
      }
      extraDirs.push(path.resolve(__dirname, "../../node_modules"));
      extraDirs.push(path.resolve(__dirname, "../../../node_modules"));
      extraDirs.push(path.resolve(__dirname, "../node_modules"));
      const origResolve = Module._resolveFilename;
      Module._resolveFilename = function(request, parent, isMain, options) {
        try {
          return origResolve.call(this, request, parent, isMain, options);
        } catch (err) {
          if (request === "sharp" || request === "@resvg/resvg-js" || request.startsWith("@resvg/")) {
            for (const dir of extraDirs) {
              if (fs.existsSync(dir)) {
                try {
                  return origResolve.call(this, request, { paths: Module._nodeModulePaths(dir) }, isMain, options);
                } catch {
                }
              }
            }
          }
          throw err;
        }
      };
    }
    setupNativeResolution();
    var coreModule = null;
    var coreAttempted = false;
    function getCore() {
      if (coreAttempted) return coreModule;
      coreAttempted = true;
      try {
        coreModule = require_src2();
      } catch {
        coreModule = null;
      }
      if (!coreModule) {
        try {
          const vscode2 = require("vscode");
          if (vscode2.workspace && Array.isArray(vscode2.workspace.workspaceFolders)) {
            for (const folder of vscode2.workspace.workspaceFolders) {
              const root = folder.uri.fsPath;
              const pkgPath = path.join(root, "packages/core");
              if (fs.existsSync(pkgPath)) {
                try {
                  coreModule = require(pkgPath);
                  if (coreModule) break;
                } catch {
                }
              }
            }
          }
        } catch {
        }
      }
      if (!coreModule) {
        const relCandidates = [
          path.resolve(__dirname, "../../packages/core"),
          path.resolve(__dirname, "../../../packages/core"),
          path.resolve(__dirname, "../packages/core")
        ];
        for (const rel of relCandidates) {
          if (fs.existsSync(rel)) {
            try {
              coreModule = require(rel);
              if (coreModule) break;
            } catch {
            }
          }
        }
      }
      return coreModule;
    }
    var initialized = false;
    var ZapError = class extends Error {
      /**
       * @param {'E_UNSAFE_SVG'|'E_UNSUPPORTED_FORMAT'|'E_WRITE_FAILED'|'E_CONVERSION_FAILED'|'E_ENGINE_UNAVAILABLE'} code
       * @param {string} message
       */
      constructor(code, message) {
        super(message);
        this.name = "ZapError";
        this.code = code;
      }
    };
    function scaleSuffix(scale) {
      if (scale === 1 || scale === void 0 || scale === null) return "";
      return `@${scale}x`;
    }
    function outputName(sourcePath, extension = "webp", scale = 1) {
      const parts = sourcePath.replace(/\\/g, "/").split("/");
      const filename = parts.pop() || "image";
      const dotIndex = filename.lastIndexOf(".");
      const base = dotIndex > 0 ? filename.substring(0, dotIndex) : filename;
      const suffix = scaleSuffix(scale);
      const ext = extension === "jpeg" ? "jpg" : extension.replace(/^\./, "");
      return `${base}${suffix}.${ext}`;
    }
    async function init2() {
      initialized = true;
    }
    function validateSvgSecurity(bytes) {
      const str = Buffer.isBuffer(bytes) ? bytes.toString("utf8") : String(bytes);
      if (str.includes("<svg") || str.includes("<?xml")) {
        if (/<(?:script|foreignObject)\b/i.test(str) || /\bon\w+\s*=/i.test(str) || /javascript:/i.test(str)) {
          throw new ZapError("E_UNSAFE_SVG", "SVG contains active script elements or event handlers.");
        }
        if (/<!ENTITY\b/i.test(str)) {
          throw new ZapError("E_UNSAFE_SVG", "Custom XML entities are not supported.");
        }
      }
    }
    function sniffInputExtension(bytes) {
      if (!bytes || bytes.length < 4) return "png";
      if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) return "png";
      if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "jpg";
      if (bytes[0] === 71 && bytes[1] === 73 && bytes[2] === 70) return "gif";
      if (bytes[0] === 73 && bytes[1] === 73 && bytes[2] === 42 && bytes[3] === 0 || bytes[0] === 77 && bytes[1] === 77 && bytes[2] === 0 && bytes[3] === 42) return "tiff";
      if (bytes.length >= 12 && bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70 && bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) return "webp";
      if (bytes.length >= 12 && bytes[4] === 102 && bytes[5] === 116 && bytes[6] === 121 && bytes[7] === 112) return "avif";
      const head = bytes.slice(0, 100).toString("utf8").trim();
      if (head.startsWith("<svg") || head.startsWith("<?xml")) return "svg";
      return "png";
    }
    function resolveNodeExecutable() {
      if (process.platform === "win32") {
        if (process.env.NODE_PATH && fs.existsSync(process.env.NODE_PATH)) {
          return process.env.NODE_PATH;
        }
        const candidates = [
          "C:\\Program Files\\nodejs\\node.exe",
          "C:\\Program Files (x86)\\nodejs\\node.exe",
          path.join(process.env.LOCALAPPDATA || "", "Programs", "nodejs", "node.exe"),
          path.join(process.env.APPDATA || "", "npm", "node.exe"),
          path.join(process.env.ProgramData || "", "chocolatey", "bin", "node.exe"),
          path.join(process.env.USERPROFILE || "", "scoop", "apps", "nodejs", "current", "node.exe")
        ];
        for (const c of candidates) {
          if (fs.existsSync(c)) {
            return c;
          }
        }
        try {
          const out = execSync("where.exe node", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], windowsHide: true });
          const first = out.split(/\r?\n/).find((p) => p.trim() && fs.existsSync(p.trim()));
          if (first) return first.trim();
        } catch {
        }
      }
      return "node";
    }
    function findLocalCli() {
      const candidates = [];
      candidates.push(path.join(__dirname, "zap.js"));
      try {
        const vscode2 = require("vscode");
        if (vscode2.workspace && Array.isArray(vscode2.workspace.workspaceFolders)) {
          for (const folder of vscode2.workspace.workspaceFolders) {
            const root = folder.uri.fsPath;
            candidates.push(path.join(root, "packages/cli/bin/zap.js"));
            candidates.push(path.join(root, "node_modules/@zapwebp/cli/bin/zap.js"));
            candidates.push(path.join(root, "node_modules/.bin/zap"));
          }
        }
      } catch {
      }
      candidates.push(path.resolve(__dirname, "../../packages/cli/bin/zap.js"));
      candidates.push(path.resolve(__dirname, "../../../packages/cli/bin/zap.js"));
      candidates.push(path.resolve(__dirname, "../packages/cli/bin/zap.js"));
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }
      return null;
    }
    async function convertViaCli(inputPath, outputPath, options = {}) {
      return new Promise((resolve, reject) => {
        const { to = "webp", quality = 85, clean = true, width, height, background } = options;
        const args = [inputPath, "-o", outputPath, "--to", to, "--quality", String(quality)];
        if (clean) args.push("--clean");
        else args.push("--no-clean");
        if (width) args.push("--width", String(width));
        if (height) args.push("--height", String(height));
        if (background) args.push("--background", String(background));
        const isWin = process.platform === "win32";
        const extraDirs = [];
        try {
          const vscode2 = require("vscode");
          if (vscode2.workspace && Array.isArray(vscode2.workspace.workspaceFolders)) {
            for (const folder of vscode2.workspace.workspaceFolders) {
              const root = folder.uri.fsPath;
              extraDirs.push(path.join(root, "node_modules"));
              extraDirs.push(path.join(root, "packages", "core", "node_modules"));
            }
          }
        } catch {
        }
        extraDirs.push(path.resolve(__dirname, "../../node_modules"));
        extraDirs.push(path.resolve(__dirname, "../../../node_modules"));
        extraDirs.push(path.resolve(__dirname, "../node_modules"));
        const nodePathEnv = [process.env.NODE_PATH, ...extraDirs.filter((d) => fs.existsSync(d))].filter(Boolean).join(path.delimiter);
        const spawnEnv = { ...process.env, NODE_PATH: nodePathEnv };
        const localCli = findLocalCli();
        if (localCli) {
          const nodeBin = resolveNodeExecutable();
          try {
            execFile(nodeBin, [localCli, ...args], { env: spawnEnv, windowsHide: true }, (err) => {
              if (!err && fs.existsSync(outputPath)) {
                return resolve(outputPath);
              }
              trySystemCli(err);
            });
            return;
          } catch (nodeSyncErr) {
            trySystemCli(nodeSyncErr);
            return;
          }
        }
        trySystemCli();
        function trySystemCli(priorErr) {
          if (isWin) {
            try {
              const proc = spawn("cmd.exe", ["/d", "/s", "/c", "zap", ...args], { env: spawnEnv, windowsHide: true });
              proc.on("close", (code) => {
                if (code === 0 && fs.existsSync(outputPath)) {
                  return resolve(outputPath);
                }
                tryNpx(priorErr);
              });
              proc.on("error", (err) => {
                tryNpx(err || priorErr);
              });
            } catch (zapSyncErr) {
              tryNpx(zapSyncErr || priorErr);
            }
          } else {
            try {
              execFile("zap", args, { env: spawnEnv }, (err) => {
                if (!err && fs.existsSync(outputPath)) {
                  return resolve(outputPath);
                }
                tryNpx(err || priorErr);
              });
            } catch (zapSyncErr) {
              tryNpx(zapSyncErr || priorErr);
            }
          }
        }
        function tryNpx(priorErr) {
          if (isWin) {
            try {
              const proc = spawn("cmd.exe", ["/d", "/s", "/c", "npx", "--yes", "zapwebp", ...args], { env: spawnEnv, windowsHide: true });
              let stderrOut = "";
              proc.stderr?.on("data", (d) => {
                stderrOut += d.toString();
              });
              proc.on("close", (code) => {
                if (code === 0 && fs.existsSync(outputPath)) {
                  return resolve(outputPath);
                }
                reject(new ZapError("E_CONVERSION_FAILED", stderrOut.trim() || priorErr?.message || "CLI conversion failed."));
              });
              proc.on("error", (err) => {
                reject(new ZapError("E_CONVERSION_FAILED", err.message || priorErr?.message || "CLI conversion failed."));
              });
            } catch (npxSyncErr) {
              reject(new ZapError("E_CONVERSION_FAILED", (npxSyncErr || priorErr || new Error("CLI fallback failed")).message));
            }
          } else {
            try {
              execFile("npx", ["--yes", "zapwebp", ...args], { env: spawnEnv }, (npxErr) => {
                if (!npxErr && fs.existsSync(outputPath)) {
                  return resolve(outputPath);
                }
                reject(new ZapError("E_CONVERSION_FAILED", (npxErr || priorErr || new Error("CLI fallback failed")).message));
              });
            } catch (npxSyncErr) {
              reject(new ZapError("E_CONVERSION_FAILED", (npxSyncErr || priorErr || new Error("CLI fallback failed")).message));
            }
          }
        }
      });
    }
    async function convertViaApi(bytes, format = "webp", width = 512, quality = 85, clean = true, background = void 0) {
      if (typeof globalThis.fetch !== "function") {
        throw new ZapError("E_ENGINE_UNAVAILABLE", "Fetch API unavailable in runtime environment.");
      }
      const formData = new FormData();
      const inExt = sniffInputExtension(bytes);
      const mimeMap = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        webp: "image/webp",
        avif: "image/avif",
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml"
      };
      const mime = mimeMap[inExt] || "application/octet-stream";
      const blob = new Blob([bytes], { type: mime });
      formData.append("file", blob, `input.${inExt}`);
      formData.append("to", format === "jpeg" ? "jpeg" : format);
      formData.append("quality", String(quality));
      formData.append("clean", String(clean));
      if (width) formData.append("width", String(width));
      if (background) formData.append("background", background);
      const endpoint = "https://zapwebp.vercel.app/api/convert";
      const res = await globalThis.fetch(endpoint, {
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new ZapError("E_CONVERSION_FAILED", `Remote conversion failed (${res.status}): ${errText}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
    async function convertBuffer(bytes, format = "webp", width = 512, quality = 85, clean = true, background = void 0) {
      await init2();
      validateSvgSecurity(bytes);
      const bg = format === "jpeg" ? background || "#ffffff" : background;
      const core = getCore();
      if (core && typeof core.convertImage === "function") {
        try {
          const result = await core.convertImage(bytes, {
            to: format,
            width,
            quality,
            clean,
            background: bg,
            verify: true
          });
          return result.data;
        } catch (err) {
          const msg = err && err.message ? err.message : String(err);
          if (msg.includes("active content") || msg.includes("script") || msg.includes("unsafe")) {
            throw new ZapError("E_UNSAFE_SVG", "SVG contains active script elements or event handlers.");
          }
          if (msg.includes("Unsupported or unrecognized") || msg.includes("Unsupported format") || msg.includes("empty")) {
            throw new ZapError("E_UNSUPPORTED_FORMAT", msg);
          }
          if (err.code !== "E_ENGINE_UNAVAILABLE" && !msg.includes("sharp")) {
            throw new ZapError("E_CONVERSION_FAILED", msg);
          }
        }
      }
      const tmpDir = os.tmpdir();
      const id = `zap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const inExt = sniffInputExtension(bytes);
      const outExt = format === "jpeg" ? "jpg" : format;
      const inPath = path.join(tmpDir, `${id}.${inExt}`);
      const outPath = path.join(tmpDir, `${id}.${outExt}`);
      let cliSuccess = false;
      try {
        await fs.promises.writeFile(inPath, bytes);
        await convertViaCli(inPath, outPath, { to: format, width, quality, clean, background: bg });
        if (fs.existsSync(outPath)) {
          const outBytes = await fs.promises.readFile(outPath);
          cliSuccess = true;
          return outBytes;
        }
      } catch {
        cliSuccess = false;
      } finally {
        try {
          await fs.promises.unlink(inPath);
        } catch {
        }
        try {
          await fs.promises.unlink(outPath);
        } catch {
        }
      }
      try {
        return await convertViaApi(bytes, format, width, quality, clean, bg);
      } catch (apiErr) {
        if (apiErr.code === "E_CONVERSION_FAILED" && apiErr.message.includes("400")) {
          throw apiErr;
        }
        throw new ZapError(
          "E_ENGINE_UNAVAILABLE",
          'Local conversion engine unavailable offline. Run "npm install -g @zapwebp/cli" for offline conversion, or connect to the internet.'
        );
      }
    }
    async function convertScalesBuffer(bytes, sourceName, baseWidth = 512, quality = 85, clean = true, targetFormat = "webp", background = void 0) {
      await init2();
      validateSvgSecurity(bytes);
      const scales = [1, 2, 3];
      const results = [];
      for (const scale of scales) {
        const width = Math.round(baseWidth * scale);
        const data = await convertBuffer(bytes, targetFormat, width, quality, clean, background);
        const filename = outputName(sourceName, targetFormat, scale);
        results.push({ scale, filename, data });
      }
      return results;
    }
    async function convertFile(inputPath, outputPath, options = {}) {
      const bytes = await fs.promises.readFile(inputPath);
      const format = options.to || "webp";
      const out = await convertBuffer(bytes, format, options.width, options.quality, options.clean);
      await fs.promises.writeFile(outputPath, out);
      return {
        sourceSize: bytes.byteLength,
        outputSize: out.byteLength
      };
    }
    module2.exports = {
      init: init2,
      convertBuffer,
      convertScalesBuffer,
      convertFile,
      outputName,
      scaleSuffix,
      ZapError
    };
  }
});

// apps/vscode/src/config.js
var require_config = __commonJS({
  "apps/vscode/src/config.js"(exports2, module2) {
    "use strict";
    var vscode2 = require("vscode");
    var VALID_FORMATS = /* @__PURE__ */ new Set(["webp", "png", "avif", "jpeg"]);
    function readConfig(workspaceConfig) {
      const config = workspaceConfig || vscode2.workspace.getConfiguration("zapwebp");
      const baseWidthRaw = Number(config.get("baseWidth", 512));
      const qualityRaw = Number(config.get("quality", 85));
      const outputRaw = String(config.get("outputExtension", "webp")).toLowerCase();
      return {
        convertOnSave: Boolean(config.get("convertOnSave", false)),
        baseWidth: Number.isFinite(baseWidthRaw) && baseWidthRaw > 0 ? baseWidthRaw : 512,
        quality: Number.isFinite(qualityRaw) && qualityRaw >= 0 && qualityRaw <= 100 ? qualityRaw : 85,
        clean: Boolean(config.get("clean", true)),
        outputExtension: VALID_FORMATS.has(outputRaw) ? outputRaw : "webp"
      };
    }
    module2.exports = {
      readConfig,
      VALID_FORMATS
    };
  }
});

// apps/vscode/src/ui/toast.js
var require_toast = __commonJS({
  "apps/vscode/src/ui/toast.js"(exports2, module2) {
    "use strict";
    var vscode2 = require("vscode");
    function formatBytes(bytes) {
      if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
      if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${Math.round(bytes)} B`;
    }
    function showSuccess(count, totalSaved, details) {
      if (count === 1 && details && details.filename && details.outputSize !== void 0) {
        const saved = (details.sourceSize || 0) - details.outputSize;
        const pct = details.sourceSize && details.sourceSize > 0 ? Math.round(saved / details.sourceSize * 100) : 0;
        const pctStr = pct >= 0 ? `\u2212${pct}%` : `+${Math.abs(pct)}%`;
        vscode2.window.showInformationMessage(`\u2705 ${details.filename} saved (${formatBytes(details.outputSize)}, ${pctStr})`);
        return;
      }
      vscode2.window.showInformationMessage(
        `\u2705 ${count} file${count === 1 ? "" : "s"} converted (${formatBytes(totalSaved)} saved)`
      );
    }
    function showError(uri, err) {
      const filename = uri && uri.path ? uri.path.split("/").pop() : "file";
      const code = err && err.code || "E_CONVERSION_FAILED";
      const message = err && err.message || String(err);
      const buttons = ["Open Docs"];
      if (code === "E_ENGINE_UNAVAILABLE") {
        buttons.push("Copy Install Command");
      }
      const promise = vscode2.window.showErrorMessage(
        `Zapwebp [${code}]: Failed to convert ${filename} \u2014 ${message}`,
        ...buttons
      );
      if (promise && typeof promise.then === "function") {
        promise.then((selection) => {
          if (selection === "Open Docs") {
            vscode2.env.openExternal(vscode2.Uri.parse(`https://zapwebp-docs.vercel.app/errors#${code.toLowerCase()}`));
          } else if (selection === "Copy Install Command") {
            vscode2.env.clipboard.writeText("npm install -g @zapwebp/cli");
            vscode2.window.showInformationMessage("Copied to clipboard: npm install -g @zapwebp/cli");
          }
        });
      }
    }
    module2.exports = {
      formatBytes,
      showSuccess,
      showError
    };
  }
});

// apps/vscode/src/ui/status-bar.js
var require_status_bar = __commonJS({
  "apps/vscode/src/ui/status-bar.js"(exports2, module2) {
    "use strict";
    var vscode2 = require("vscode");
    var { formatBytes } = require_toast();
    function getTodayDate() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    var ZapStatusBar = class {
      constructor() {
        this.outputChannel = vscode2.window.createOutputChannel("Zapwebp");
        this.item = vscode2.window.createStatusBarItem(vscode2.StatusBarAlignment.Right, 100);
        this.item.command = "zapwebp.showOutput";
        this.currentDate = getTodayDate();
        this.count = 0;
        this.bytesSaved = 0;
        this.refresh();
      }
      /**
       * Refreshes status bar item representation.
       */
      refresh() {
        this.checkDailyReset();
        if (this.count === 0) {
          this.item.text = "\u26A1 Zapwebp";
          this.item.tooltip = "Zapwebp: Ready to convert images. Click to view logs.";
        } else {
          this.item.text = `\u26A1 Zapwebp: ${this.count} file${this.count === 1 ? "" : "s"} converted`;
          this.item.tooltip = `Zapwebp: ${this.count} file${this.count === 1 ? "" : "s"} converted (${formatBytes(this.bytesSaved)} saved today). Click to view logs.`;
        }
        this.item.show();
      }
      /**
       * Verifies date and resets counter if day rolled over.
       */
      checkDailyReset() {
        const today = getTodayDate();
        if (this.currentDate !== today) {
          this.currentDate = today;
          this.count = 0;
          this.bytesSaved = 0;
        }
      }
      /**
       * Increments the conversion count and saved bytes.
       * @param {number} [filesCount=1]
       * @param {number} [bytes=0]
       */
      increment(filesCount = 1, bytes = 0) {
        this.checkDailyReset();
        this.count += filesCount;
        this.bytesSaved += Math.max(0, bytes);
        this.refresh();
      }
      /**
       * Appends an entry to the Zapwebp output channel.
       * @param {string} message
       */
      log(message) {
        const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19);
        this.outputChannel.appendLine(`[${timestamp}] ${message}`);
      }
      /**
       * Reveals the Zapwebp output channel panel.
       */
      showOutput() {
        this.outputChannel.show(true);
      }
      /**
       * Disposes the status bar item and output channel.
       */
      dispose() {
        this.item.dispose();
        this.outputChannel.dispose();
      }
    };
    var statusBar2 = new ZapStatusBar();
    module2.exports = {
      ZapStatusBar,
      statusBar: statusBar2
    };
  }
});

// apps/vscode/src/commands/convert.js
var require_convert = __commonJS({
  "apps/vscode/src/commands/convert.js"(exports2, module2) {
    "use strict";
    var vscode2 = require("vscode");
    var { convertBuffer } = require_core();
    var { readConfig } = require_config();
    var { showSuccess, showError } = require_toast();
    var { statusBar: statusBar2 } = require_status_bar();
    var SUPPORTED_INPUT_EXTENSIONS = ["svg", "png", "jpg", "jpeg", "webp", "avif", "gif", "tif", "tiff"];
    function siblingUri(uri, ext) {
      const normalizedExt = ext === "jpeg" ? "jpg" : ext.replace(/^\./, "");
      const parts = uri.path.split("/");
      const filename = parts.pop();
      const dotIndex = filename.lastIndexOf(".");
      const base = dotIndex > 0 ? filename.substring(0, dotIndex) : filename;
      parts.push(`${base}.${normalizedExt}`);
      return uri.with({ path: parts.join("/") });
    }
    async function resolveTargets(uri, uris) {
      if (Array.isArray(uris) && uris.length > 0) return uris;
      if (uri) return [uri];
      if (vscode2.window.activeTextEditor?.document?.uri) {
        const activeUri = vscode2.window.activeTextEditor.document.uri;
        const ext = activeUri.path.split(".").pop()?.toLowerCase();
        if (SUPPORTED_INPUT_EXTENSIONS.includes(ext)) {
          return [activeUri];
        }
      }
      const selected = await vscode2.window.showOpenDialog({
        canSelectMany: true,
        filters: { Images: SUPPORTED_INPUT_EXTENSIONS }
      });
      return selected && selected.length > 0 ? selected : [];
    }
    async function executeBatchConvert(targets, targetFormat = "webp", options = {}) {
      if (!targets || targets.length === 0) return;
      const config = readConfig();
      const format = targetFormat || config.outputExtension || "webp";
      let background = options.background;
      if (format === "jpeg" && !background) {
        background = "#ffffff";
      }
      let totalSaved = 0;
      let count = 0;
      let lastDetails = null;
      await vscode2.window.withProgress(
        {
          location: vscode2.ProgressLocation.Notification,
          title: `Zapwebp (${format.toUpperCase()})`,
          cancellable: false
        },
        async (progress) => {
          for (const fileUri of targets) {
            const filename = fileUri.path.split("/").pop();
            progress.report({ message: filename });
            try {
              const outUri = siblingUri(fileUri, format);
              if (outUri.path === fileUri.path) {
                throw new Error(`Output (${format}) cannot overwrite its input source file.`);
              }
              const bytes = await vscode2.workspace.fs.readFile(fileUri);
              const out = await convertBuffer(
                bytes,
                format,
                config.baseWidth,
                config.quality,
                config.clean,
                background
              );
              await vscode2.workspace.fs.writeFile(outUri, out);
              const saved = bytes.byteLength - out.byteLength;
              totalSaved += Math.max(0, saved);
              count++;
              lastDetails = {
                filename: outUri.path.split("/").pop(),
                sourceSize: bytes.byteLength,
                outputSize: out.byteLength
              };
              statusBar2.log(`Converted ${filename} -> ${lastDetails.filename} (${out.byteLength} bytes)`);
            } catch (err) {
              statusBar2.log(`Error converting ${filename}: ${err.message}`);
              showError(fileUri, err);
            }
          }
        }
      );
      if (count > 0) {
        statusBar2.increment(count, totalSaved);
        showSuccess(count, totalSaved, lastDetails);
      }
    }
    function registerConvertCommand2(context) {
      const cmdConvert = vscode2.commands.registerCommand("zapwebp.convert", async (uri, uris) => {
        const targets = await resolveTargets(uri, uris);
        if (targets.length === 0) return;
        const config = readConfig();
        await executeBatchConvert(targets, config.outputExtension || "webp");
      });
      const cmdPng = vscode2.commands.registerCommand("zapwebp.convertToPng", async (uri, uris) => {
        const targets = await resolveTargets(uri, uris);
        if (targets.length === 0) return;
        await executeBatchConvert(targets, "png");
      });
      const cmdAvif = vscode2.commands.registerCommand("zapwebp.convertToAvif", async (uri, uris) => {
        const targets = await resolveTargets(uri, uris);
        if (targets.length === 0) return;
        await executeBatchConvert(targets, "avif");
      });
      const cmdJpeg = vscode2.commands.registerCommand("zapwebp.convertToJpeg", async (uri, uris) => {
        const targets = await resolveTargets(uri, uris);
        if (targets.length === 0) return;
        const bg = await vscode2.window.showInputBox({
          prompt: "JPEG cannot store transparency. Flatten background color:",
          value: "#ffffff",
          placeHolder: "#ffffff"
        });
        if (bg === void 0) return;
        await executeBatchConvert(targets, "jpeg", { background: bg || "#ffffff" });
      });
      const cmdPrompt = vscode2.commands.registerCommand("zapwebp.convertPrompt", async (uri, uris) => {
        const targets = await resolveTargets(uri, uris);
        if (targets.length === 0) return;
        const picked = await vscode2.window.showQuickPick(
          [
            {
              label: "$(zap) WebP",
              description: "Recommended \u2022 High compression, alpha transparency preserved",
              format: "webp"
            },
            {
              label: "$(file-media) PNG",
              description: "Lossless \u2022 Perfect alpha retention, maximum compatibility",
              format: "png"
            },
            {
              label: "$(sparkle) AVIF",
              description: "Next-Gen \u2022 Extreme compression, modern web standard",
              format: "avif"
            },
            {
              label: "$(file-binary) JPEG",
              description: "Photographic \u2022 Universal compatibility (flattens transparency)",
              format: "jpeg"
            }
          ],
          {
            placeHolder: "Select target format for image conversion"
          }
        );
        if (!picked) return;
        let background;
        if (picked.format === "jpeg") {
          background = await vscode2.window.showInputBox({
            prompt: "JPEG cannot store transparency. Flatten background color:",
            value: "#ffffff",
            placeHolder: "#ffffff"
          });
          if (background === void 0) return;
        }
        await executeBatchConvert(targets, picked.format, { background });
      });
      context.subscriptions.push(cmdConvert);
      context.subscriptions.push(cmdPng);
      context.subscriptions.push(cmdAvif);
      context.subscriptions.push(cmdJpeg);
      context.subscriptions.push(cmdPrompt);
    }
    module2.exports = {
      registerConvertCommand: registerConvertCommand2,
      executeBatchConvert,
      resolveTargets,
      siblingUri,
      SUPPORTED_INPUT_EXTENSIONS
    };
  }
});

// apps/vscode/src/commands/convert-scales.js
var require_convert_scales = __commonJS({
  "apps/vscode/src/commands/convert-scales.js"(exports2, module2) {
    "use strict";
    var vscode2 = require("vscode");
    var { convertScalesBuffer } = require_core();
    var { readConfig } = require_config();
    var { showError } = require_toast();
    var { statusBar: statusBar2 } = require_status_bar();
    var SUPPORTED_SCALE_INPUTS = ["svg", "png", "jpg", "jpeg", "webp", "avif", "gif", "tif", "tiff"];
    async function resolveScaleTargets(uri, uris) {
      if (Array.isArray(uris) && uris.length > 0) return uris;
      if (uri) return [uri];
      if (vscode2.window.activeTextEditor?.document?.uri) {
        const activeUri = vscode2.window.activeTextEditor.document.uri;
        const ext = activeUri.path.split(".").pop()?.toLowerCase();
        if (SUPPORTED_SCALE_INPUTS.includes(ext)) {
          return [activeUri];
        }
      }
      const selected = await vscode2.window.showOpenDialog({
        canSelectMany: true,
        filters: { Images: SUPPORTED_SCALE_INPUTS }
      });
      return selected && selected.length > 0 ? selected : [];
    }
    async function executeScales(targets, format = "webp") {
      if (!targets || targets.length === 0) return;
      const config = readConfig();
      let totalGenerated = 0;
      let successfulInputs = 0;
      let lastFilename = "";
      await vscode2.window.withProgress(
        {
          location: vscode2.ProgressLocation.Notification,
          title: `Zapwebp Multi-Scale (${format.toUpperCase()})`,
          cancellable: false
        },
        async (progress) => {
          for (const fileUri of targets) {
            const filename = fileUri.path.split("/").pop();
            lastFilename = filename;
            progress.report({ message: filename });
            try {
              const bytes = await vscode2.workspace.fs.readFile(fileUri);
              const scaleOutputs = await convertScalesBuffer(
                bytes,
                filename,
                config.baseWidth,
                config.quality,
                config.clean,
                format
              );
              const dir = fileUri.path.substring(0, fileUri.path.lastIndexOf("/") + 1);
              for (const item of scaleOutputs) {
                const outUri = fileUri.with({ path: `${dir}${item.filename}` });
                await vscode2.workspace.fs.writeFile(outUri, item.data);
                statusBar2.log(`Generated ${item.filename} (${item.data.byteLength} bytes)`);
                totalGenerated++;
              }
              successfulInputs++;
            } catch (err) {
              statusBar2.log(`Error generating scales for ${filename}: ${err.message}`);
              showError(fileUri, err);
            }
          }
        }
      );
      if (totalGenerated > 0) {
        statusBar2.increment(totalGenerated, 0);
        if (successfulInputs === 1) {
          vscode2.window.showInformationMessage(`\u2705 Generated @1x, @2x, @3x ${format.toUpperCase()} assets for ${lastFilename}`);
        } else {
          vscode2.window.showInformationMessage(`\u2705 Generated ${totalGenerated} scale assets across ${successfulInputs} images (${format.toUpperCase()})`);
        }
      }
    }
    function registerConvertScalesCommand2(context) {
      const cmd = vscode2.commands.registerCommand("zapwebp.convertScales", async (uri, uris) => {
        const targets = await resolveScaleTargets(uri, uris);
        if (targets.length === 0) return;
        await executeScales(targets, "webp");
      });
      const cmdPrompt = vscode2.commands.registerCommand("zapwebp.convertScalesPrompt", async (uri, uris) => {
        const targets = await resolveScaleTargets(uri, uris);
        if (targets.length === 0) return;
        const picked = await vscode2.window.showQuickPick(
          [
            { label: "$(zap) WebP Multi-Scale", description: "Generate @1x, @2x, @3x WebP assets", format: "webp" },
            { label: "$(file-media) PNG Multi-Scale", description: "Generate @1x, @2x, @3x lossless PNG assets", format: "png" },
            { label: "$(sparkle) AVIF Multi-Scale", description: "Generate @1x, @2x, @3x next-gen AVIF assets", format: "avif" }
          ],
          {
            placeHolder: "Select format for Retina multi-scale generation (@1x, @2x, @3x)"
          }
        );
        if (!picked) return;
        await executeScales(targets, picked.format);
      });
      context.subscriptions.push(cmd);
      context.subscriptions.push(cmdPrompt);
    }
    module2.exports = {
      registerConvertScalesCommand: registerConvertScalesCommand2,
      executeScales,
      resolveScaleTargets,
      SUPPORTED_SCALE_INPUTS
    };
  }
});

// apps/vscode/src/hover/provider.js
var require_provider = __commonJS({
  "apps/vscode/src/hover/provider.js"(exports2, module2) {
    "use strict";
    var vscode2 = require("vscode");
    var { convertBuffer } = require_core();
    var { readConfig } = require_config();
    function createCheckerboardDataUri(base64Data, mimeType) {
      const svg = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">',
        "  <defs>",
        '    <pattern id="zap-checker" width="16" height="16" patternUnits="userSpaceOnUse">',
        '      <rect width="8" height="8" fill="#d1d5db" />',
        '      <rect x="8" width="8" height="8" fill="#f3f4f6" />',
        '      <rect y="8" width="8" height="8" fill="#f3f4f6" />',
        '      <rect x="8" y="8" width="8" height="8" fill="#d1d5db" />',
        "    </pattern>",
        "  </defs>",
        '  <rect width="100%" height="100%" fill="url(#zap-checker)" rx="6" />',
        `  <image href="data:${mimeType};base64,${base64Data}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />`,
        "</svg>"
      ].join("");
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
    }
    function registerHoverProvider2(context) {
      const provider = vscode2.languages.registerHoverProvider(
        { pattern: "**/*.{svg,png,jpg,jpeg}" },
        {
          async provideHover(document) {
            const config = readConfig();
            try {
              const bytes = await vscode2.workspace.fs.readFile(document.uri);
              const out = await convertBuffer(
                bytes,
                config.outputExtension,
                config.baseWidth,
                config.quality,
                config.clean
              );
              const b64 = Buffer.from(out).toString("base64");
              const mime = `image/${config.outputExtension}`;
              const previewUri = createCheckerboardDataUri(b64, mime);
              const md = new vscode2.MarkdownString();
              md.supportHtml = true;
              md.isTrusted = true;
              md.appendMarkdown("**Zapwebp preview**\n\n");
              md.appendMarkdown(`![preview](${previewUri})

`);
              md.appendMarkdown(`Size: ${out.byteLength.toLocaleString()} bytes \u2022 Format: ${config.outputExtension.toUpperCase()}`);
              return new vscode2.Hover(md);
            } catch {
              return null;
            }
          }
        }
      );
      context.subscriptions.push(provider);
    }
    module2.exports = {
      registerHoverProvider: registerHoverProvider2,
      createCheckerboardDataUri
    };
  }
});

// apps/vscode/src/watcher/on-save.js
var require_on_save = __commonJS({
  "apps/vscode/src/watcher/on-save.js"(exports2, module2) {
    "use strict";
    var vscode2 = require("vscode");
    var { convertBuffer } = require_core();
    var { readConfig } = require_config();
    var { statusBar: statusBar2 } = require_status_bar();
    function registerOnSaveWatcher2(context) {
      const debounceTimers = /* @__PURE__ */ new Map();
      const handleUri = (uri) => {
        const config = readConfig();
        if (!config.convertOnSave) return;
        if (!uri || !uri.path || !uri.path.toLowerCase().endsWith(".svg")) return;
        const key = uri.toString();
        if (debounceTimers.has(key)) {
          clearTimeout(debounceTimers.get(key));
        }
        const timer = setTimeout(async () => {
          debounceTimers.delete(key);
          try {
            const latestConfig = readConfig();
            if (!latestConfig.convertOnSave) return;
            const bytes = await vscode2.workspace.fs.readFile(uri);
            const out = await convertBuffer(
              bytes,
              "webp",
              latestConfig.baseWidth,
              latestConfig.quality,
              latestConfig.clean
            );
            const outUri = uri.with({ path: uri.path.replace(/\.svg$/i, ".webp") });
            await vscode2.workspace.fs.writeFile(outUri, out);
            const filename = uri.path.split("/").pop();
            const outFilename = outUri.path.split("/").pop();
            statusBar2.log(`[convertOnSave] Auto-converted ${filename} -> ${outFilename} (${out.byteLength} bytes)`);
            statusBar2.increment(1, Math.max(0, bytes.byteLength - out.byteLength));
          } catch (err) {
            const filename = uri && uri.path ? uri.path.split("/").pop() : "svg";
            statusBar2.log(`[convertOnSave] Error auto-converting ${filename}: ${err.message}`);
          }
        }, 500);
        debounceTimers.set(key, timer);
      };
      const watcher = vscode2.workspace.createFileSystemWatcher("**/*.svg");
      watcher.onDidChange(handleUri);
      watcher.onDidCreate(handleUri);
      const onSaveSub = vscode2.workspace.onDidSaveTextDocument((doc) => {
        if (doc && doc.uri) {
          handleUri(doc.uri);
        }
      });
      context.subscriptions.push(watcher);
      context.subscriptions.push(onSaveSub);
      context.subscriptions.push({
        dispose: () => {
          for (const t of debounceTimers.values()) {
            clearTimeout(t);
          }
          debounceTimers.clear();
        }
      });
    }
    module2.exports = {
      registerOnSaveWatcher: registerOnSaveWatcher2
    };
  }
});

// apps/vscode/src/extension.js
var vscode = require("vscode");
var { init } = require_core();
var { registerConvertCommand } = require_convert();
var { registerConvertScalesCommand } = require_convert_scales();
var { registerHoverProvider } = require_provider();
var { registerOnSaveWatcher } = require_on_save();
var { statusBar } = require_status_bar();
function activate(context) {
  init().catch((err) => {
    statusBar.log(`Engine initialization error: ${err.message}`);
  });
  registerConvertCommand(context);
  registerConvertScalesCommand(context);
  registerHoverProvider(context);
  registerOnSaveWatcher(context);
  const showOutputCmd = vscode.commands.registerCommand("zapwebp.showOutput", () => {
    statusBar.showOutput();
  });
  context.subscriptions.push(showOutputCmd);
  context.subscriptions.push(statusBar);
  vscode.window.showInformationMessage("Zapwebp is ready. Right-click an image in the Explorer.");
}
function deactivate() {
  statusBar.dispose();
}
module.exports = {
  activate,
  deactivate
};
