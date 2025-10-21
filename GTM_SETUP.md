# Google Tag Manager Setup Guide

This guide will help you set up Google Ads conversion tracking using Google Tag Manager (GTM) for the KakoBuy Spreadsheet.

## Overview

Google Tag Manager (GTM) is already integrated into your site with ID: **GTM-5Z56S4H7**

The site pushes the following event to GTM's dataLayer when users interact with signup buttons:
- Event Name: `conversion_event_signup_1`

You now need to configure GTM to track this event as a Google Ads conversion.

---

## Part 1: Set Up Google Ads Conversion Action

### Step 1: Create Conversion in Google Ads

1. **Log in to Google Ads**: Go to [ads.google.com](https://ads.google.com)

2. **Navigate to Conversions**:
   - Click **Tools & Settings** (wrench icon)
   - Under "Measurement", click **Conversions**

3. **Create New Conversion**:
   - Click **+ New conversion action**
   - Select **Website**

4. **Configure Conversion Settings**:
   - **Category**: "Sign-up" or "Submit lead form"
   - **Conversion name**: "KakoBuy Signup Button Click"
   - **Value**: Choose "Don't use a value" (unless you know the value)
   - **Count**: "One" (count once per click)
   - **Click-through conversion window**: 30 days
   - **View-through conversion window**: 1 day
   - **Attribution model**: Data-driven (recommended)

5. **Select Tag Setup Method**:
   - Choose **"Use Google Tag Manager"**
   - Click **Save and continue**

6. **Copy the Conversion Details**:
   - **Conversion ID**: Looks like `AW-XXXXXXXXXX`
   - **Conversion Label**: A string like `AbC1dEfGhIjK`
   - **Keep this window open** - you'll need these values for GTM

---

## Part 2: Configure Google Tag Manager

### Step 2: Access Your GTM Container

1. **Log in to GTM**: Go to [tagmanager.google.com](https://tagmanager.google.com)

2. **Open Container**: GTM-5Z56S4H7

### Step 3: Create a Trigger for the Conversion Event

1. **Go to Triggers**:
   - In the left sidebar, click **Triggers**
   - Click **New**

2. **Configure Trigger**:
   - **Name**: "Signup Button Click - conversion_event_signup_1"
   - Click the trigger configuration box
   - **Trigger Type**: Select **Custom Event**
   - **Event name**: `conversion_event_signup_1`
   - **This trigger fires on**: "All Custom Events"
   - Click **Save**

### Step 4: Create Google Ads Conversion Tag

1. **Go to Tags**:
   - In the left sidebar, click **Tags**
   - Click **New**

2. **Configure Tag**:
   - **Name**: "Google Ads - Signup Conversion"
   - Click the tag configuration box
   - **Tag Type**: Select **Google Ads Conversion Tracking**

3. **Enter Conversion Details** (from Step 1):
   - **Conversion ID**: `AW-XXXXXXXXXX` (your ID from Google Ads)
   - **Conversion Label**: `AbC1dEfGhIjK` (your label from Google Ads)
   - **Conversion Value**: Leave blank (optional)
   - **Transaction ID**: Leave blank (optional)

4. **Set Triggering**:
   - Click the **Triggering** box
   - Select the trigger you created: **"Signup Button Click - conversion_event_signup_1"**
   - Click **Save**

### Step 5: Test Your Setup (Preview Mode)

1. **Enter Preview Mode**:
   - In GTM, click **Preview** (top right)
   - Enter your website URL: `https://kakobuy-spreadsheet.com`
   - Or test locally: `http://localhost:3001`

2. **Test the Conversion**:
   - Navigate your site in the preview window
   - Click a signup button
   - Check the **Tag Assistant** panel:
     - Should show "Signup Button Click - conversion_event_signup_1" event fired
     - Should show "Google Ads - Signup Conversion" tag fired

3. **Verify dataLayer**:
   - Open browser console
   - Type: `window.dataLayer`
   - Look for the `conversion_event_signup_1` event

### Step 6: Publish Your Changes

1. **Submit Changes**:
   - Click **Submit** (top right in GTM)
   - Add version name: "Google Ads Signup Conversion Tracking"
   - Add description: "Added conversion tag for signup button clicks"
   - Click **Publish**

---

## Part 3: Verify Conversions

### Step 7: Wait and Monitor

1. **Wait for Data** (24-48 hours):
   - Google Ads takes time to verify conversions
   - Test clicks won't immediately show in reports

2. **Check Conversion Status**:
   - Go to Google Ads > Conversions
   - Find "KakoBuy Signup Button Click"
   - Status should change from "Unverified" to "Recording conversions"

3. **View Conversion Data**:
   - Go to Google Ads > Campaigns
   - Add "Conversions" column to see data
   - Or go to Reports > Predefined > Basic conversions

---

## Part 4: Create Google Ads Campaign

### Step 8: Set Up Search Campaign

1. **Create New Campaign**:
   - In Google Ads, click **+ New campaign**
   - **Goal**: "Leads" or "Website traffic"
   - **Campaign type**: Search
   - Click **Continue**

2. **Campaign Settings**:
   - **Name**: "KakoBuy Spreadsheet - Search"
   - **Networks**: Google Search (uncheck Search partners initially)
   - **Locations**: Select your target countries
   - **Languages**: English (or your target languages)
   - **Budget**: Set your daily budget (start with $10-20/day)
   - **Bidding**:
     - Strategy: "Maximize conversions" or "Target CPA"
     - If using Target CPA, start with $5-10

3. **Add Keywords**:
   - Click **+ Keywords**
   - Add these keywords:
     ```
     kakobuy spreadsheet
     kakobuy price list
     kakobuy finds
     kakobuy coupons
     kakobuy qc photos
     best kakobuy spreadsheet
     kakobuy shopping guide
     kakobuy product list
     ```
   - Match types: Start with "Broad match" or "Phrase match"

4. **Create Ad**:
   - **Headline 1**: "KakoBuy Spreadsheet 2025"
   - **Headline 2**: "10,000+ Verified Products"
   - **Headline 3**: "Exclusive Coupons & QC Photos"
   - **Description 1**: "Access the most comprehensive KakoBuy database with verified finds, live QC photos, and exclusive discount codes."
   - **Description 2**: "Updated daily. Save up to 25% on every order. Join 50,000+ smart shoppers."
   - **Final URL**: https://kakobuy-spreadsheet.com

5. **Add Ad Extensions**:
   - **Sitelinks**:
     - "View Spreadsheet" → /kakobuy-spreadsheet
     - "Weekly Finds" → /features/finds-of-the-week
     - "QC Photos" → /features/kakobuy-qc-images
     - "Articles" → /articles
   - **Callouts**:
     - "10,000+ Products"
     - "Updated Daily"
     - "Exclusive Coupons"
     - "Expert Reviews"

6. **Launch Campaign**:
   - Review all settings
   - Click **Create campaign**

---

## Troubleshooting

### Event Not Firing in GTM Preview

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Click a signup button
   - Look for: `[GTM] Event pushed to dataLayer: conversion_event_signup_1`

2. **Verify dataLayer**:
   ```javascript
   // In browser console
   window.dataLayer
   // Should show array with conversion_event_signup_1
   ```

3. **Check Trigger**:
   - In GTM Preview, verify the trigger is listening for the exact event name
   - Event name is case-sensitive

### Tag Not Firing

1. **Check Trigger Association**:
   - In GTM, open your tag
   - Verify the correct trigger is selected

2. **Verify Conversion ID/Label**:
   - Double-check the values from Google Ads
   - Format: ID is `AW-XXXXXXXXXX`, Label is alphanumeric

### No Conversions in Google Ads

1. **Wait 24-48 Hours**:
   - Conversions take time to show up

2. **Check GTM Tag Status**:
   - In GTM, go to Tag Manager Home
   - View "Tag Health" - should show the tag firing

3. **Use Google Ads Diagnostic**:
   - Go to Google Ads > Conversions
   - Click on your conversion
   - Click "Tag setup" > "Check installation"
   - Enter your website URL

---

## Where Events Are Triggered

Events are pushed to dataLayer in these components:

### 1. TrackSignUpButton (`components/TrackSignUpButton.tsx`)
- Main signup button used throughout the site
- Triggers: `conversion_event_signup_1`
- Navigates to KakoBuy signup after tracking

### 2. GiveawayForm (`components/GiveawayForm.tsx`)
- Email signup form on homepage
- Triggers: `conversion_event_signup_1`
- Fires only on successful submission

---

## Additional GTM Recommendations

### Track Other Important Events

You can also track these events through GTM:

1. **Product Views**:
   - Event: `product_view`
   - When: User views a product detail page

2. **Product Purchases**:
   - Event: `product_purchase_click`
   - When: User clicks "Buy Now" button

3. **Article Views**:
   - Event: `article_view`
   - When: User reads an article

To add these, modify the respective components to push events to dataLayer using the `pushToDataLayer` utility.

---

## Resources

- [Google Tag Manager Help](https://support.google.com/tagmanager)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/1722022)
- [GTM for Google Ads](https://support.google.com/tagmanager/answer/6105160)
- [Debug with GTM Preview](https://support.google.com/tagmanager/answer/6107056)

---

## Quick Reference

**GTM Container ID**: GTM-5Z56S4H7

**Conversion Event Name**: `conversion_event_signup_1`

**Event Triggers On**:
- Signup button clicks (homepage, pages throughout site)
- Giveaway form successful submissions

**Where to Configure**:
- GTM Dashboard: [tagmanager.google.com](https://tagmanager.google.com)
- Google Ads: [ads.google.com](https://ads.google.com)
