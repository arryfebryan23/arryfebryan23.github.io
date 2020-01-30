importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
	console.log(`Workbox berhasil dimuat`);
else
	console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
	{ url: '/', revision: '1' },
	{ url: '/index.html', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/players.html', revision: '1' },
	{ url: '/teams.html', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/icon.png', revision: '1' },
	{ url: '/icon-192x192.html', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/css/materialize.min.css', revision: '1' },
	{ url: '/css/materialize.css', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
	{ url: '/js/materialize.js', revision: '1' },
	{ url: '/js/db.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/js/materialize.js', revision: '1' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/nav.js', revision: '1' },
	{ url: '/js/show-result.js', revision: '1' },
	{ url: '/pages/about.html', revision: '1' },
	{ url: '/pages/contact.html', revision: '1' },
	{ url: '/pages/home.html', revision: '1' },
	{ url: '/pages/league.html', revision: '1' },
	{ url: '/pages/saved-players.html', revision: '1' },
	{ url: '/pages/saved-teams.js', revision: '1' },
	{ url: '/pages/scorers.js', revision: '1' }
]);

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	workbox.strategies.cacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
			}),
		],
	}),
);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
	new RegExp('/players.html'),
	workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
	new RegExp('/teams.html'),
	workbox.strategies.staleWhileRevalidate()
);


workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2/'),
	workbox.strategies.staleWhileRevalidate()
)


workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets',
	})
);

workbox.routing.registerRoute(
	/^https:\/\/fonts\.gstatic\.com/,
	workbox.strategies.cacheFirst({
		cacheName: 'google-fonts-webfonts',
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200],
			}),
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	})
);

self.addEventListener('push', function (event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: 'img/notification.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});
