import {faker} from '@faker-js/faker';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTypings from './components/UserTypings';

const words = faker.lorem.words(10);

const App = () => {
  return (
    <>
      <CountdownTimer timeLeft={30} />
      <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
      <GeneratedWords words={words} /> 
      <UserTypings className="absolute inset-0" userInput= {"test"}/>
      </div>
      <RestartButton 
      className= {"mx-auto mt-10 text-slate-500"}
      onRestart={() => null}
      />
      <Results 
      className="mt-10"
      errors={10}
      accuracyPercentage={100}
      total={200} />
    </>
  )
}

const GeneratedWords = ({ words }: { words: string}) => {
  return <div className="text-slate-500">{words}</div>
}

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium text-center"> Time: {timeLeft}</h2>
}

export default App;