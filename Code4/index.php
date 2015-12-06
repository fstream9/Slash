<?php require_once( "Elements/HEADER.php" ); ?>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-8" id="OutputContainer">
          <canvas width="800px" height="600px"></canvas>
        </div>

        <div class="col-xs-4" id="InputContainer">
          <h2>Input</h2>

            <div class="form-group">
              <label for="comment">Code:</label>
              <textarea class="form-control" rows="5" id="CodeTextArea" name="CodeTextArea"></textarea>
            </div>

            <button type="submit" id="RunCode" name="RunCode" class="btn btn-primary btn-block">Run The Code :D</button>
        </div>
      </div>
    </div>

    <div id="TestColour" style="display:hidden;"></div>

<?php require_once( "Elements/FOOTER.php" ); ?>
