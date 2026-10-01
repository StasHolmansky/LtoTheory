export type SignCategoryId =
  | 'direction'
  | 'priority'
  | 'parking'
  | 'limits'
  | 'awareness'
  | 'warning'
  | 'informative'
  | 'markings';

export type SignGroupId =
  | 'curves'
  | 'intersections'
  | 'obstacles'
  | 'railroad'
  | 'roadwork'
  | 'directions'
  | 'services'
  | 'markers';

export type SignCategory = {
  id: SignCategoryId;
  name: string;
  summary: string;
};

export type SignItem = {
  id: string;
  categoryId: SignCategoryId;
  groupId?: SignGroupId;
  name: string;
  description: string;
};

export const signCategories: SignCategory[] = [
  {
    id: 'direction',
    name: 'Direction signs',
    summary: 'These signs show the only direction you are obliged to follow.',
  },
  {
    id: 'priority',
    name: 'Priority signs',
    summary: 'These signs decide who must yield and who may go. At a stop sign you must stop completely.',
  },
  {
    id: 'parking',
    name: 'Parking and stopping',
    summary: 'These signs say where you may park or stop, and where loading and unloading is forbidden.',
  },
  {
    id: 'limits',
    name: 'Vehicle limits',
    summary: 'These signs set a limit for the vehicle. If you exceed it, you must not enter that road.',
  },
  {
    id: 'awareness',
    name: 'People on the road',
    summary: 'A yellow sign asks you to watch for pedestrians, cyclists, or persons with disability.',
  },
  {
    id: 'warning',
    name: 'Warning signs',
    summary: 'These signs warn you of a hazard ahead and may call for a lower speed.',
  },
  {
    id: 'informative',
    name: 'Informative signs',
    summary: 'These signs tell you directions, distances, services, route numbers, and how to pass a hazard.',
  },
  {
    id: 'markings',
    name: 'Pavement markings',
    summary: 'Lines and symbols painted on the road. A double yellow or solid white line must not be crossed to overtake.',
  },
];

export const signGroups: Record<SignGroupId, string> = {
  curves: 'Curves',
  intersections: 'Intersections',
  obstacles: 'Road obstacles',
  railroad: 'Railroad crossings',
  roadwork: 'Road work',
  directions: 'Directions and distances',
  services: 'Services',
  markers: 'Route and hazard markers',
};

export const signs: SignItem[] = [
  {
    id: 'dir-straight',
    categoryId: 'direction',
    name: 'Straight ahead only',
    description: 'You must continue straight. Do not turn left or right.',
  },
  {
    id: 'dir-left',
    categoryId: 'direction',
    name: 'Turn left',
    description: 'You must turn left. Going straight or turning right is not allowed.',
  },
  {
    id: 'dir-right',
    categoryId: 'direction',
    name: 'Turn right',
    description: 'You must turn right. Going straight or turning left is not allowed.',
  },
  {
    id: 'dir-left-ahead',
    categoryId: 'direction',
    name: 'Turn left ahead',
    description: 'A left turn is required at the junction ahead. Position the vehicle early and do not plan to go straight.',
  },
  {
    id: 'dir-right-ahead',
    categoryId: 'direction',
    name: 'Turn right ahead',
    description: 'A right turn is required at the junction ahead. Position the vehicle early and do not plan to go straight.',
  },
  {
    id: 'dir-keep-left',
    categoryId: 'direction',
    name: 'Keep left',
    description: 'Pass on the left side of the island, median, or obstruction.',
  },
  {
    id: 'dir-keep-right',
    categoryId: 'direction',
    name: 'Keep right',
    description: 'Pass on the right side of the island, median, or obstruction.',
  },
  {
    id: 'dir-either',
    categoryId: 'direction',
    name: 'Pass either side',
    description: 'You may pass the obstruction on the left or on the right.',
  },
  {
    id: 'dir-one-way',
    categoryId: 'direction',
    name: 'One way',
    description: 'All traffic travels only in the direction of the arrow. Do not enter against the arrow.',
  },
  {
    id: 'dir-two-way',
    categoryId: 'direction',
    name: 'Two way',
    description: 'Traffic moves in both directions. Stay on the right side of the road.',
  },
  {
    id: 'pri-stop',
    categoryId: 'priority',
    name: 'Stop',
    description: 'Come to a full stop at the stop line, or before the intersection if there is no line. Move off only when the way is clear.',
  },
  {
    id: 'pri-give-way',
    categoryId: 'priority',
    name: 'Give way',
    description: 'Slow down and let crossing traffic go first. Stop if you need to. If the way is already clear, you do not have to stop.',
  },
  {
    id: 'pri-left-give',
    categoryId: 'priority',
    name: 'Left turner must give way',
    description: 'A driver turning left must give way to oncoming vehicles that are going straight or turning right.',
  },
  {
    id: 'park-no',
    categoryId: 'parking',
    name: 'No parking',
    description: 'Do not leave the vehicle parked. A brief stop to pick up or drop off a passenger is allowed only if you stay with the vehicle and no stopping sign forbids it.',
  },
  {
    id: 'park-no-stop',
    categoryId: 'parking',
    name: 'No stopping',
    description: 'Do not stop or park here, even for a moment. Stopping in this zone blocks the flow of traffic.',
  },
  {
    id: 'park-allowed',
    categoryId: 'parking',
    name: 'Parking allowed',
    description: 'You may park only in the designated area and only within the times or conditions shown on the sign.',
  },
  {
    id: 'park-loading',
    categoryId: 'parking',
    name: 'Loading and unloading',
    description: 'This bay is for loading and unloading goods or passengers. Do not leave the vehicle parked here for any other reason.',
  },
  {
    id: 'park-no-loading',
    categoryId: 'parking',
    name: 'No loading or unloading',
    description: 'Do not stop here to load or unload goods or passengers.',
  },
  {
    id: 'lim-height',
    categoryId: 'limits',
    name: 'Height limit',
    description: 'The number is the maximum height. A taller vehicle must not enter, because it will not fit under the bridge or structure.',
  },
  {
    id: 'lim-width',
    categoryId: 'limits',
    name: 'Width limit',
    description: 'The number is the maximum width. A wider vehicle must not enter this road.',
  },
  {
    id: 'lim-weight',
    categoryId: 'limits',
    name: 'Weight limit',
    description: 'The number is the maximum gross weight. A heavier vehicle must not enter, or it may damage the road or bridge.',
  },
  {
    id: 'lim-length',
    categoryId: 'limits',
    name: 'Length limit',
    description: 'The number is the maximum length. A longer vehicle must not enter this road.',
  },
  {
    id: 'lim-axle',
    categoryId: 'limits',
    name: 'Axle weight limit',
    description: 'The number is the maximum weight allowed on one axle. If an axle is heavier than that, the vehicle must not enter.',
  },
  {
    id: 'lim-no-entry',
    categoryId: 'limits',
    name: 'No entry',
    description: 'Vehicles must not enter. The road may be one-way against you, or closed to the vehicles this sign applies to.',
  },
  {
    id: 'lim-no-trucks',
    categoryId: 'limits',
    name: 'No trucks',
    description: 'Trucks are prohibited. Use another road.',
  },
  {
    id: 'lim-speed',
    categoryId: 'limits',
    name: 'Speed limit',
    description: 'Do not go faster than the number shown, in kilometers per hour. The posted sign controls this stretch of road.',
  },
  {
    id: 'lim-end-speed',
    categoryId: 'limits',
    name: 'End of speed limit',
    description: 'The posted speed restriction ends here. The usual limit for that kind of road applies again.',
  },
  {
    id: 'aw-ped',
    categoryId: 'awareness',
    name: 'Pedestrian crossing',
    description: 'Pedestrians may be crossing. Slow down and stop if someone is on or about to enter the crossing.',
  },
  {
    id: 'aw-bike',
    categoryId: 'awareness',
    name: 'Cyclists',
    description: 'Cyclists may be riding along the road or crossing it. Slow down and give them room.',
  },
  {
    id: 'aw-pwd',
    categoryId: 'awareness',
    name: 'Persons with disability',
    description: 'Persons with disability may be crossing or using this area. Slow down and give them enough time.',
  },
  {
    id: 'warn-curve-l',
    categoryId: 'warning',
    groupId: 'curves',
    name: 'Curve to the left',
    description: 'The road bends left. Slow down before the curve, not in the middle of it.',
  },
  {
    id: 'warn-curve-r',
    categoryId: 'warning',
    groupId: 'curves',
    name: 'Curve to the right',
    description: 'The road bends right. Slow down before the curve and stay in your lane.',
  },
  {
    id: 'warn-sharp-l',
    categoryId: 'warning',
    groupId: 'curves',
    name: 'Sharp turn left',
    description: 'A tight left bend is ahead. Reduce speed more than you would for an ordinary curve.',
  },
  {
    id: 'warn-sharp-r',
    categoryId: 'warning',
    groupId: 'curves',
    name: 'Sharp turn right',
    description: 'A tight right bend is ahead. Reduce speed more than you would for an ordinary curve.',
  },
  {
    id: 'warn-winding',
    categoryId: 'warning',
    groupId: 'curves',
    name: 'Winding road',
    description: 'A series of curves is ahead. Keep a steady lower speed until the winding section ends.',
  },
  {
    id: 'warn-cross',
    categoryId: 'warning',
    groupId: 'intersections',
    name: 'Intersection ahead',
    description: 'A crossroad is ahead. Be ready for vehicles entering from the left and the right.',
  },
  {
    id: 'warn-side-l',
    categoryId: 'warning',
    groupId: 'intersections',
    name: 'Side road on the left',
    description: 'A road joins from the left. Watch for vehicles entering your road.',
  },
  {
    id: 'warn-side-r',
    categoryId: 'warning',
    groupId: 'intersections',
    name: 'Side road on the right',
    description: 'A road joins from the right. Watch for vehicles entering your road.',
  },
  {
    id: 'warn-t',
    categoryId: 'warning',
    groupId: 'intersections',
    name: 'T-junction',
    description: 'The road ends at a crossroad. You will have to turn left or right.',
  },
  {
    id: 'warn-round',
    categoryId: 'warning',
    groupId: 'intersections',
    name: 'Roundabout ahead',
    description: 'A roundabout is ahead. Slow down and give way to vehicles already circulating.',
  },
  {
    id: 'warn-signal',
    categoryId: 'warning',
    groupId: 'intersections',
    name: 'Traffic lights ahead',
    description: 'A signalized intersection is ahead. Be ready to stop if the light is red or about to change.',
  },
  {
    id: 'warn-slip',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Slippery road',
    description: 'The surface may be slippery, especially when wet. Slow down and avoid sudden braking or steering.',
  },
  {
    id: 'warn-hump',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Hump or uneven road',
    description: 'A hump or rough surface is ahead. Slow down before you reach it so you do not lose control.',
  },
  {
    id: 'warn-rocks',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Falling rocks',
    description: 'Rocks may fall onto the roadway. Do not stop under the slope, and watch the pavement ahead.',
  },
  {
    id: 'warn-narrow',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Road narrows',
    description: 'The road becomes narrower ahead. Slow down and do not overtake while the lanes are tight.',
  },
  {
    id: 'warn-bridge',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Narrow bridge',
    description: 'The bridge is not wide enough for two vehicles to pass easily. Approach slowly and yield if the other vehicle is already on it.',
  },
  {
    id: 'warn-two-way',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Two-way traffic',
    description: 'You are about to meet oncoming traffic. Move to the right and do not overtake until you can see that the road is clear.',
  },
  {
    id: 'warn-down',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Steep descent',
    description: 'A steep downhill is ahead. Shift to a lower gear and control your speed without riding the brakes.',
  },
  {
    id: 'warn-animal',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Animals crossing',
    description: 'Animals may be on the road. Slow down and be ready to stop.',
  },
  {
    id: 'warn-flood',
    categoryId: 'warning',
    groupId: 'obstacles',
    name: 'Flood',
    description: 'This stretch can flood. If water covers the road, do not drive through it.',
  },
  {
    id: 'warn-rail',
    categoryId: 'warning',
    groupId: 'railroad',
    name: 'Railroad crossing',
    description: 'Train tracks are ahead. Slow down, look both ways, and stop if a train is coming or the gate is down. Never stop on the tracks.',
  },
  {
    id: 'warn-work',
    categoryId: 'warning',
    groupId: 'roadwork',
    name: 'Road work ahead',
    description: 'Workers or equipment are ahead. Slow down and follow the flagger and any temporary signs.',
  },
  {
    id: 'info-advance',
    categoryId: 'informative',
    groupId: 'directions',
    name: 'Advance direction',
    description: 'Shows where each road leads before you reach the junction, so you can choose the correct lane in time.',
  },
  {
    id: 'info-distance',
    categoryId: 'informative',
    groupId: 'directions',
    name: 'Distance',
    description: 'Shows how far it is to the places named on the sign, usually in kilometers.',
  },
  {
    id: 'info-hospital',
    categoryId: 'informative',
    groupId: 'services',
    name: 'Hospital',
    description: 'Points to a hospital. It does not order you to turn. Follow it only if you need that service.',
  },
  {
    id: 'info-fuel',
    categoryId: 'informative',
    groupId: 'services',
    name: 'Fuel',
    description: 'Points to a fuel station.',
  },
  {
    id: 'info-food',
    categoryId: 'informative',
    groupId: 'services',
    name: 'Food',
    description: 'Points to a place where you can get food.',
  },
  {
    id: 'info-phone',
    categoryId: 'informative',
    groupId: 'services',
    name: 'Telephone',
    description: 'Points to a public telephone.',
  },
  {
    id: 'info-parking',
    categoryId: 'informative',
    groupId: 'services',
    name: 'Parking area',
    description: 'Points to a parking area. It is guidance, not permission to stop on the road itself.',
  },
  {
    id: 'info-route',
    categoryId: 'informative',
    groupId: 'markers',
    name: 'Route marker',
    description: 'Identifies the highway number and the direction of that route.',
  },
  {
    id: 'info-chevron',
    categoryId: 'informative',
    groupId: 'markers',
    name: 'Hazard marker',
    description: 'A chevron marks a sharp change of direction or the edge of an obstruction. Slow down and follow the direction of the chevrons.',
  },
  {
    id: 'info-work',
    categoryId: 'informative',
    groupId: 'markers',
    name: 'Road work information',
    description: 'Tells you that road work is taking place and often how far the work area extends. Follow the detour or temporary lane it shows.',
  },
  {
    id: 'mark-double-yellow',
    categoryId: 'markings',
    name: 'Double solid yellow line',
    description: 'A barrier line. Do not cross it to overtake in either direction. You may cross it only to turn into a driveway or side road when that turn is allowed and safe.',
  },
  {
    id: 'mark-single-yellow',
    categoryId: 'markings',
    name: 'Single solid yellow line',
    description: 'Overtaking is prohibited. Do not cross the line to pass another vehicle.',
  },
  {
    id: 'mark-broken-yellow',
    categoryId: 'markings',
    name: 'Broken yellow line',
    description: 'You may overtake when the opposite lane is clear and the pass can be completed safely.',
  },
  {
    id: 'mark-mixed-yellow',
    categoryId: 'markings',
    name: 'Solid and broken yellow lines',
    description: 'Overtaking is allowed only on the side of the broken line. If the solid line is on your side, you must not cross it to pass.',
  },
  {
    id: 'mark-broken-white',
    categoryId: 'markings',
    name: 'Broken white line',
    description: 'Separates lanes moving in the same direction. You may change lanes when it is safe and you will not block other traffic.',
  },
  {
    id: 'mark-solid-white',
    categoryId: 'markings',
    name: 'Solid white line',
    description: 'Stay in your lane. Crossing a solid white line is discouraged and needs special care.',
  },
  {
    id: 'mark-double-white',
    categoryId: 'markings',
    name: 'Double solid white line',
    description: 'Do not cross it. It separates lanes that must not change, often where traffic moves in the same direction.',
  },
  {
    id: 'mark-zebra',
    categoryId: 'markings',
    name: 'Pedestrian crossing',
    description: 'The zebra stripes are a crossing. Stop for pedestrians who are on it or stepping onto it.',
  },
  {
    id: 'mark-box',
    categoryId: 'markings',
    name: 'Yellow box junction',
    description: 'Do not enter the yellow box unless your exit is clear. Do not stop inside the box, or you will block the intersection.',
  },
  {
    id: 'mark-stop',
    categoryId: 'markings',
    name: 'Stop line',
    description: 'A white line across your lane. When you must stop, stop behind this line, not on or past it.',
  },
  {
    id: 'mark-arrow',
    categoryId: 'markings',
    name: 'Lane arrow',
    description: 'The arrow painted in the lane shows the only movements allowed from that lane: straight, turn, or both.',
  },
  {
    id: 'mark-edge',
    categoryId: 'markings',
    name: 'Yellow edge line',
    description: 'A continuous yellow line along the edge of the road means you must not stop on that side.',
  },
];

export function signsInCategory(categoryId: SignCategoryId): SignItem[] {
  return signs.filter(item => item.categoryId === categoryId);
}
