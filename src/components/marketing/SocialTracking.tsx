import React from 'react';

const SocialTracking = () => {
  // Facebook Tracking Code
  React.useEffect(() => {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
      FB.init({
        appId      : 'YOUR_APP_ID',
        cookie     : true,
        xfbml      : true,
        version    : 'v9.0'
      });
    };
  }, []);

  // TikTok Tracking Code
  React.useEffect(() => {
    !function (w, d, t) {
      w.TiktokAnalytics = w.TiktokAnalytics || []; 
      w.TiktokAnalytics.methods = ['track', 'identify'];
      w.TiktokAnalytics.factory = function (t) {
        return function () {
          var args = [].slice.call(arguments);
          args.unshift(t);
          w.TiktokAnalytics.push(args);
          return w.TiktokAnalytics;
        };
      };
      for (var i = 0; i < w.TiktokAnalytics.methods.length; i++) {
        var key = w.TiktokAnalytics.methods[i];
        w.TiktokAnalytics[key] = w.TiktokAnalytics.factory(key);
      }
      w.TiktokAnalytics.load = function (id) {
        var start = document.createElement('script');
        start.src = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        document.head.appendChild(start);
      };
      w.TiktokAnalytics.load('YOUR_PIXEL_ID');
    }(window, document);
  }, []);

  return <div>Social Tracking Component Loaded</div>;
};

export default SocialTracking;
