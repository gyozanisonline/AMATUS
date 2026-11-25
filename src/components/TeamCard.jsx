// White rounded card in the same family as the pixel cards: square photo in
// black and white, turning AMATUS red on hover; name and role underneath.

export default function TeamCard({ name, role, photo }) {
  return (
    <article className="team-card">
      <div className="team-card__photo">
        <img src={photo} alt={name || ''} loading="lazy" width="640" height="640" />
      </div>
      <div className="team-card__text">
        {name ? (
          <h3 className="team-card__name">{name}</h3>
        ) : (
          <h3 className="team-card__name team-card__name--pending">Name to come</h3>
        )}
        <p className="team-card__role">{role || 'Role to come'}</p>
      </div>
    </article>
  );
}
