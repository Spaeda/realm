exports = function(arg){
  if (!context.user) return false;

  const identities = context.user.identities || [];

  const authIdentities = identities.filter(
    (i) => i["provider_type"] === "custom-token"
  );

  return authIdentities.length === 1;
};