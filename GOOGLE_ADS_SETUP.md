# Google Ads Conversion Tracking Setup Guide

> **NOTE**: This site now uses Google Tag Manager (GTM). For the recommended GTM-based setup, see **[GTM_SETUP.md](./GTM_SETUP.md)** instead. This guide covers the legacy direct implementation.

---

This guide will help you set up Google Ads conversion tracking for the KakoBuy Spreadsheet signup buttons.

## Step 1: Create a Google Ads Conversion Action

1. **Log in to Google Ads**: Go to [ads.google.com](https://ads.google.com)

2. **Navigate to Conversions**:
   - Click on **Tools & Settings** (wrench icon) in the top right
   - Under "Measurement", click **Conversions**

3. **Create New Conversion**:
   - Click the **+ New conversion action** button
   - Select **Website** as the conversion source

4. **Configure Conversion Settings**:
   - **Category**: Choose "Sign-up" or "Submit lead form"
   - **Conversion name**: "KakoBuy Signup Button Click" (or your preferred name)
   - **Value**:
     - If you know the value of each signup, enter it
     - Otherwise, select "Don't use a value"
   - **Count**: Select "One" (count every conversion once per click)
   - **Click-through conversion window**: 30 days (recommended)
   - **View-through conversion window**: 1 day
   - **Attribution model**: Select your preferred model (Data-driven recommended)

5. **Create and Continue**:
   - Click **Create and continue**

## Step 2: Get Your Google Ads ID

After creating the conversion action, you'll see a setup screen:

1. **Get the Google Ads ID**:
   - Look for the tag that looks like: `AW-XXXXXXXXXX`
   - This is your `NEXT_PUBLIC_GOOGLE_ADS_ID`

Example:
```
Google Ads ID: AW-123456789
```

2. **Note**: The conversion event name is hardcoded as `conversion_event_signup_1` in the implementation. This is the event that will be tracked in Google Ads.

3. **Copy the Google Ads ID** - you'll need it for the next step

## Step 3: Configure Environment Variables

1. **Create/Update `.env.local` file** in your project root:

```bash
# Google Ads Conversion Tracking
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

2. **Replace the X's** with your actual Google Ads ID from Step 2

3. **Important**: Never commit `.env.local` to version control (it's already in `.gitignore`)

## Step 4: Deploy and Test

### Local Testing

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test the conversion tracking**:
   - Open your browser's Developer Console (F12)
   - Navigate to your site at http://localhost:3001
   - Click a signup button
   - Check the Console for: `[Google Ads] Conversion event sent: conversion_event_signup_1 -> [URL]`
   - The button should navigate to the signup URL after a brief delay

3. **Verify in Google Tag Assistant**:
   - Install the [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
   - Enable it on your site
   - Click a signup button
   - Tag Assistant should show the conversion event fired

### Production Deployment

1. **Add environment variables to your hosting platform**:

   **Vercel**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `NEXT_PUBLIC_GOOGLE_ADS_ID`
   - Redeploy your site

   **Other platforms**: Add the environment variables according to your platform's documentation

2. **Test on production**:
   - Visit your live site
   - Click a signup button
   - Wait 24-48 hours for conversions to appear in Google Ads

## Step 5: Verify Conversions in Google Ads

1. **Check Conversion Status**:
   - Go to Google Ads > Tools & Settings > Conversions
   - Find your "KakoBuy Signup Button Click" conversion
   - Look for the event name `conversion_event_signup_1`
   - Status should change from "Unverified" to "Recording conversions" within 24-48 hours

2. **View Conversion Data**:
   - After the conversion is verified, you can see conversion data in:
     - Campaigns tab (Conversions column)
     - Reports section
     - Conversion tracking dashboard

## Step 6: Create Google Ads Campaign

Now you can create campaigns targeting "kakobuy spreadsheet" and other keywords:

1. **Create New Campaign**:
   - Click **+ New campaign**
   - Goal: Website traffic or Leads
   - Campaign type: Search

2. **Set Up Campaign**:
   - Name: "KakoBuy Spreadsheet - Search"
   - Budget: Set your daily budget
   - Bidding: Target CPA or Maximize conversions
   - Target the conversion action you created

3. **Add Keywords**:
   - kakobuy spreadsheet
   - kakobuy price list
   - kakobuy finds
   - kakobuy coupons
   - (add more relevant keywords)

4. **Create Ads**:
   - Write compelling ad copy highlighting your spreadsheet features
   - Use site links to different sections
   - Include call-to-action buttons

5. **Launch and Monitor**:
   - Start with a modest budget
   - Monitor conversion rates
   - Optimize based on performance

## Troubleshooting

### Conversions Not Showing Up

1. **Check Console Logs**:
   - Open browser console
   - Click signup button
   - Verify you see the conversion tracking log

2. **Verify Tag Installation**:
   - Use Google Tag Assistant
   - Ensure gtag.js is loading correctly

3. **Check Environment Variables**:
   - Verify they're set correctly in your deployment
   - Make sure they start with `NEXT_PUBLIC_` (required for client-side access)

4. **Wait 24-48 Hours**:
   - Conversions can take time to appear in Google Ads
   - Be patient before assuming something is wrong

### Multiple Conversions Tracked

- This is expected if users click the button multiple times
- Google Ads will deduplicate based on your conversion settings (One vs Every)

## Where Conversions Are Tracked

The conversion tracking is implemented in:

1. **TrackSignUpButton Component** (`components/TrackSignUpButton.tsx`)
   - Tracks when users click the main signup button
   - Uses delayed navigation pattern to ensure conversion is tracked before redirect
   - Waits up to 2 seconds for tracking to complete before navigating
   - Used on homepage and other pages

2. **GiveawayForm Component** (`components/GiveawayForm.tsx`)
   - Tracks when users successfully submit the giveaway form
   - Only fires on successful email submission
   - No navigation delay needed (form submission only)

## Implementation Details

The conversion tracking uses Google's recommended **delayed navigation pattern**:

- When a signup button is clicked, the conversion event is fired first
- Navigation to the signup URL is delayed until the event is confirmed sent (or 2 second timeout)
- This ensures conversions are properly tracked even if the user navigates quickly
- Event name: `conversion_event_signup_1`

## Additional Resources

- [Google Ads Conversion Tracking Guide](https://support.google.com/google-ads/answer/1722022)
- [Google Tag Assistant](https://support.google.com/tagassistant/answer/2947093)
- [Conversion Tracking Best Practices](https://support.google.com/google-ads/answer/6095947)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Use Google Tag Assistant to debug
4. Contact Google Ads support for account-specific issues
