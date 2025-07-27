import ImageLink from '../ImageLink';

export function About() {
  const className = 'text-2xl  text-center text-cyan-600 mb-4 leading-15';
  return (
    <div className="max-w-2xl mx-auto p-5 ">
      <h1 className={className}>What about me?</h1>
      <h1 className={className}>Do you really wanna hurt me, baby?</h1>
      <h1 className={className}>Tell me now: What about me?</h1>
      <h1 className={className}>
        Do you wanna break my heart to pieces? Girl, I gotta know:
      </h1>
      <h1 className={className}>What about me. What about me?</h1>

      <ImageLink />
    </div>
  );
}
