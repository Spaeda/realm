exports = async function (arg) {
  const dbName = context.values.get('dbName');
  const db = context.services.get('mongodb-atlas').db(dbName);
  /*********************************************************************
   * Get composition
   *********************************************************************/
  const compoCollection = db.collection('Composition');
  const composition = await compoCollection.findOne({ _id: arg.fullDocument.composition });
  if (composition == null) {
    console.error(`No composition with id '${arg.fullDocument.composition}' has been found.`);
    return { arg: arg };
  }

  /*********************************************************************
   * Authenticate to IdentityServer
   *********************************************************************/
  const authResult = await context.functions.execute('authenticate');
  if (!authResult.success) {
    return { arg: arg };
  }

  /*********************************************************************
   * Save notification
   *********************************************************************/
  const notification = {
    db: db,
    partition: arg.fullDocument._partition,
    type: 'access-granted',
    emitter: composition.owner,
    receiver: arg.fullDocument.user,
    composition: composition._id,
  };
  await context.functions.execute('addOrUpdateNotification', notification);

  /*********************************************************************
   * Send notification
   *********************************************************************/
  const notifArgs = {
    token: authResult.token,
    notification: {
      key: 'COMPOSITION_INVITATION',
      type: 'CompositionInvitation',
      for: arg.fullDocument.user,
      messageParameters: {
        from: {
          type: 'User',
          value: composition.owner,
        },
      },
      additional: {
        composition: `${arg.fullDocument.composition}`,
      },
    },
  };
  await context.functions.execute('sendNotification', notifArgs);

  return { arg: arg };
};
