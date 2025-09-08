// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GreenlightVault {
    struct Project {
        address creator;
        string title;
        string metadata; // IPFS hash / project details
        uint256 goal;    // min amount to greenlight
        uint256 deadline;
        uint256 totalStaked;
        bool finalized;
        bool greenlit;
    }

    uint256 public projectCount;
    mapping(uint256 => Project) public projects;
    mapping(uint256 => mapping(address => uint256)) public stakes;

    event ProjectCreated(uint256 projectId, address creator, string title, uint256 goal, uint256 deadline);
    event Staked(uint256 projectId, address supporter, uint256 amount);
    event Unstaked(uint256 projectId, address supporter, uint256 amount);
    event ProjectFinalized(uint256 projectId, bool greenlit);

    // Create a new project
    function createProject(string memory _title, string memory _metadata, uint256 _goal, uint256 _duration) external {
        require(_goal > 0, "Goal must be > 0");
        require(_duration > 0, "Duration must be > 0");

        projectCount++;
        uint256 projectId = projectCount;

        projects[projectId] = Project({
            creator: msg.sender,
            title: _title,
            metadata: _metadata,
            goal: _goal,
            deadline: block.timestamp + _duration,
            totalStaked: 0,
            finalized: false,
            greenlit: false
        });

        emit ProjectCreated(projectId, msg.sender, _title, _goal, block.timestamp + _duration);
    }

    // Stake to support a project
    function stake(uint256 _projectId) external payable {
        Project storage project = projects[_projectId];
        require(block.timestamp < project.deadline, "Project ended");
        require(msg.value > 0, "Must stake > 0");

        stakes[_projectId][msg.sender] += msg.value;
        project.totalStaked += msg.value;

        emit Staked(_projectId, msg.sender, msg.value);
    }

    // Unstake after deadline
    function unstake(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(block.timestamp > project.deadline, "Not ended yet");

        uint256 amount = stakes[_projectId][msg.sender];
        require(amount > 0, "Nothing to unstake");

        stakes[_projectId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Unstaked(_projectId, msg.sender, amount);
    }

    // Finalize project (anyone can call after deadline)
    function finalizeProject(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(block.timestamp > project.deadline, "Not ended yet");
        require(!project.finalized, "Already finalized");

        project.finalized = true;
        if (project.totalStaked >= project.goal) {
            project.greenlit = true;
        }

        emit ProjectFinalized(_projectId, project.greenlit);
    }
}
