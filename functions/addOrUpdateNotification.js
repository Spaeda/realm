exports = async function (arg) {
  let result;
  const collection = arg.db.collection('UserNotification');

  // Create search predicate
  const predicate = {
    _partition: arg.partition,
    type: arg.type,
    emitter: arg.emitter,
    receiver: arg.receiver,
    $or: [{ consumed: { $exists: false } }, { consumed: null }],
  };
  if (arg.composition) {
    predicate.composition = arg.composition;
  }

  // Get existing non read notification
  let notification = await collection.findOne(predicate);

  // If a non read notification has been found, update created date
  if (notification && notification._id) {
    result = await collection.updateOne({ _id: notification._id }, { $set: { created: new Date() } });
  } else {
    // If not found, add new document
    notification = {
      _partition: arg.partition,
      type: arg.type,
      emitter: arg.emitter,
      receiver: arg.receiver,
      created: new Date(),
    };
    if (arg.composition) {
      notification.composition = arg.composition;
    }
    // Insert new document
    result = await collection.insertOne(notification);
  }

  console.log(result);

  return { arg: arg };
};
