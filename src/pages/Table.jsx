import { Check, X } from 'lucide-react'

export default function Table() {
  const features = [
    { name: 'Real work experience', videoCourses: false, bootcamps: false, MentorPick: true },
    { name: 'True, project-based learning', videoCourses: false, bootcamps: false, MentorPick: true },
    { name: 'Live sessions & mentorship', videoCourses: false, bootcamps: true, MentorPick: true },
    { name: 'Job-ready portfolio', videoCourses: false, bootcamps: false, MentorPick: true },
    { name: 'Externship with top companies', videoCourses: false, bootcamps: false, MentorPick: true },
    { name: 'Career guidance', videoCourses: false, bootcamps: true, MentorPick: true },
    { name: 'Assured Referrals', videoCourses: false, bootcamps: false, MentorPick: true },
  ]

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
          Real Work Experience, Real Project-Based Learning With MentorPick
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          The best way to learn a skill is by applying what you learn in real scenarios. At MentorPick, we take it a notch
          higher by giving you actual work experience-based learning. So, instead of just watching tutorials, you
          actually experience building real products like professional engineers.
        </p>
        <p className="text-lg text-gray-600">
          Basically, how a real professional working in a leading product company would grow their career.
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-emerald-400 text-white">
                <th className="p-2 text-left"></th>
                <th className="p-2 text-center">Video Courses</th>
                <th className="p-2 text-center">Bootcamps</th>
                <th className="p-2 text-center">MentorPick</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-emerald-50' : 'bg-yellow-50'}>
                  <td className="p-2 text-left">{feature.name}</td>
                  <td className="p-2 text-center">
                    {feature.videoCourses ? <Check className="inline text-emerald-500" /> : <X className="inline text-gray-400" />}
                  </td>
                  <td className="p-2 text-center">
                    {feature.bootcamps ? <Check className="inline text-emerald-500" /> : <X className="inline text-gray-400" />}
                  </td>
                  <td className="p-2 text-center">
                    {feature.MentorPick ? <Check className="inline text-emerald-500" /> : <X className="inline text-gray-400" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Recruiters too, look for real project experience when hiring tech professionals and here at MentorPick, we strive to provide just that. We
          empower learners with high-quality applied learning opportunities and build skills that translate into career growth and success.
        </p>
      </div>
      <br>
      </br>
      
    </>
  )
}
