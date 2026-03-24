'use strict';

// Replaces @iconify/react in ALL webpack compilations.
// Webpack replaces `typeof window` at compile time:
//   - Server bundles: `typeof window` → "undefined" → dead-code eliminates
//     the require below, so the real iconify never lands in server chunks.
//   - Client bundles: loads the real iconify via @iconify/react-impl
//     (a separate alias that bypasses this stub).

if (typeof window !== 'undefined') {
  module.exports = require('@iconify/react-impl');
} else {
  exports.Icon = function Icon() { return null; };
}
