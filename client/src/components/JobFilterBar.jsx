// src/components/JobFilterBar.jsx
const JobFilterBar = ({
  keyword,
  setKeyword,
  location,
  setLocation,
  jobType,
  setJobType,
  locations,
  jobTypes,
}) => {
  return (
    <div className="job-filter-bar">
      <input
        type="text"
        placeholder="Search by title or company"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="all">All locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc.toLowerCase()}>
            {loc}
          </option>
        ))}
      </select>

      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="all">All job types</option>
        {jobTypes.map((jt) => (
          <option key={jt} value={jt.toLowerCase()}>
            {jt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobFilterBar;
