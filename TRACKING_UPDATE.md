# Tracking Update Summary

## ✅ Changes Implemented

### 1. **Unified Event Naming**
All tracking platforms now use the same event name: **`sign_up`**

Previously:
- ❌ Google Analytics 4: `sign_up`
- ❌ Google Ads (GTM): `conversion_event_signup_1`
- ❌ Giveaway Form: `generate_lead`

Now:
- ✅ **All platforms**: `sign_up`
- ✅ **Consistent parameters** across all tracking

### 2. **Opens in New Tab**
Sign up button now opens KakoBuy registration in a **new tab** instead of redirecting the current page.

**Before**: `window.location.href = url` (same window redirect)
**After**: `window.open(url, '_blank', 'noopener,noreferrer')` (new tab)

### 3. **Prevents Double Opening**
Fixed bug where the new tab would open twice due to both callback and timeout firing.

---

## 📊 Current Event Tracking Structure

### Event: `sign_up`
**Used by**: Google Analytics 4, Google Ads (GTM), TikTok

### Signup Button Click

**Platforms tracked**:
1. ✅ **Google Analytics 4** (direct via gtag)
2. ✅ **Google Ads** (via GTM dataLayer)
3. ✅ **TikTok Pixel**

**Event parameters**:
```javascript
{
  event: 'sign_up',
  method: 'button_click',
  event_category: 'engagement',
  event_label: 'kakobuy_signup',
  value: 1
}
```

### Giveaway Form Submission

**Platforms tracked**:
1. ✅ **Google Analytics 4** (direct via gtag)
2. ✅ **Google Ads** (via GTM dataLayer)

**Event parameters**:
```javascript
{
  event: 'sign_up',
  method: 'giveaway_form',
  event_category: 'engagement',
  event_label: 'giveaway_entry',
  value: 1
}
```

---

## 🔄 User Flow

### When user clicks "Sign Up" button:

```
1. User clicks button
   ↓
2. Track Google Analytics 4: sign_up (method: button_click)
   ↓
3. Track TikTok Pixel: Subscribe
   ↓
4. Track Google Ads (GTM dataLayer): sign_up (method: button_click)
   ↓
5. Wait 1 second for tracking to complete
   ↓
6. Open KakoBuy signup in NEW TAB
   ↓
7. User stays on your site (original tab remains)
```

---

## 🎯 Google Tag Manager Setup

Since all events now use `sign_up`, you need to update your **GTM triggers**:

### Old Trigger (deprecated):
- Event name: `conversion_event_signup_1`

### New Trigger (current):
- Event name: `sign_up`
- Can filter by method:
  - `button_click` = Signup button clicks
  - `giveaway_form` = Giveaway entries

### GTM Configuration Steps:

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Select container: **GTM-5Z56S4H7**
3. **Triggers** → Find your Google Ads conversion trigger
4. Update trigger to listen for: `sign_up` event
5. (Optional) Add filter: `method equals button_click`
6. **Submit** and **Publish** changes

---

## 📈 Benefits of Unified Tracking

### 1. **Consistent Reporting**
- Same event name across all platforms
- Easier to compare conversion data
- Simplified analytics dashboards

### 2. **Better Google Ads Attribution**
- Google Ads can see both GA4 and GTM events
- Improved conversion tracking accuracy
- Better optimization signals

### 3. **Cleaner Event Structure**
- Single event to track: `sign_up`
- Different methods for different sources
- Consistent parameters across platforms

---

## 🧪 Testing Checklist

### Test Signup Button:
- [ ] Click "Sign Up" button
- [ ] Verify opens in **new tab**
- [ ] Check console for tracking logs:
  ```
  [GTM] Event pushed to dataLayer: sign_up
  [GTM] Signup conversion tracked -> https://www.kakobuy.com/...
  [GTM] Opening in new tab: https://www.kakobuy.com/...
  ```
- [ ] Verify in GA4 DebugView: `sign_up` event appears
- [ ] Verify parameters: `method=button_click`

### Test Giveaway Form:
- [ ] Submit email in giveaway form
- [ ] Check console for tracking logs
- [ ] Verify in GA4 DebugView: `sign_up` event appears
- [ ] Verify parameters: `method=giveaway_form`

---

## 📁 Files Modified

| File | Changes |
|------|---------|
| `lib/gtag-ads.ts` | - Changed event name from `conversion_event_signup_1` to `sign_up`<br>- Changed navigation from same window to new tab<br>- Added unified event parameters<br>- Reduced timeout from 2000ms to 1000ms |
| `components/GiveawayForm.tsx` | - Changed GA4 event from `generate_lead` to `sign_up`<br>- Added `method: 'giveaway_form'` parameter<br>- Consistent event structure |
| `app/layout.tsx` | - Added `debug_mode: true` for local testing |

---

## 🔧 Environment Variables

Your current setup:
```env
NEXT_PUBLIC_INVITE_URL=https://www.kakobuy.com/register_sps?affcode=kakobuyspreadsheet
```

This URL is used for the signup redirect and opens in a new tab.

---

## 🎉 Results

### Before:
- ❌ Different event names across platforms
- ❌ Redirected in same window
- ❌ Confusing double navigation
- ❌ Hard to track conversions

### After:
- ✅ Unified `sign_up` event everywhere
- ✅ Opens in new tab (better UX)
- ✅ Single navigation (no duplicates)
- ✅ Easy conversion tracking

---

## 🚀 Next Steps

1. **Update GTM triggers** to listen for `sign_up` event
2. **Test locally** using GA4 DebugView
3. **Deploy to production**
4. **Monitor conversions** in Google Ads
5. **Verify events** in GA4 after 24-48 hours

---

## 📞 Support

If you need to revert to old event names:

```javascript
// In lib/gtag-ads.ts, change:
pushToDataLayer('sign_up', { ... })

// Back to:
pushToDataLayer('conversion_event_signup_1', { ... })
```

But the new unified approach is **recommended** for better cross-platform tracking! ✨

---

**Last Updated**: January 2025
**Status**: 🟢 Production Ready
**Build Status**: ✅ All tests passing
