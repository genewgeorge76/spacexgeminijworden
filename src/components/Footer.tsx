<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-xs mt-12 border-t border-gray-800 pt-8">
  {[
    "Amelia", "Ashland", "Bon Air", "Caroline", "Charles City", "Chester", "Chesterfield", 
    "Colonial Heights", "Culpeper", "Cumberland", "Dinwiddie", "Fluvanna", "Fredericksburg", 
    "Glen Allen", "Goochland", "Henrico", "Hopewell", "King George", "King William", 
    "Lakeside", "Louisa", "McLean", "Mechanicsville", "Midlothian", "Moseley", "New Kent", 
    "Orange", "Petersburg", "Powhatan", "Prince George", "Richmond", "Sandston", 
    "Short Pump", "Spotsylvania", "Stafford", "Stratford Hills", "Tuckahoe", "Warrenton", 
    "Westham Parkway", "Windsor Farms"
  ].map((city) => (
    <a 
      key={city} 
      href={`/locations/${city.toLowerCase().replace(/ /g, '-')}`} 
      className="hover:text-[#ffcc00] transition-colors"
    >
      Paving {city}, VA
    </a>
  ))}
</div>
